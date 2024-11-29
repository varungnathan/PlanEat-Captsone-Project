import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getDatabase, ref, push, set, onValue, update, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

function FamilyMealPlannerPage() {
  const auth = getAuth();
  const user = auth.currentUser;

  const db = getDatabase();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [mealDate, setMealDate] = useState('');
  const [mealTime, setMealTime] = useState('Breakfast');
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [selectedViewer, setSelectedViewer] = useState('');
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelationship, setNewMemberRelationship] = useState('');

  const fetchMealPlans = useCallback(() => {
    if (user?.uid) {
      const membersRef = ref(db, `familyMealPlans/${user.uid}/members`);
      onValue(membersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const allPlans = [];
          Object.keys(data).forEach((memberId) => {
            const member = data[memberId];
            member.mealPlans &&
              Object.keys(member.mealPlans).forEach((planId) => {
                const plan = member.mealPlans[planId];
                allPlans.push({
                  ...plan,
                  id: planId,
                  memberId,
                  memberName: member.name,
                  memberRelationship: member.relationship,
                });
              });
          });
          setMealPlans(allPlans);
        } else {
          setMealPlans([]);
        }
      });
    }
  }, [db, user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      const membersRef = ref(db, `familyMealPlans/${user.uid}/members`);
      onValue(membersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const membersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setFamilyMembers(membersArray);
        }
      });
    }
  }, [user?.uid, db]);

  useEffect(() => {
    fetchMealPlans();
  }, [fetchMealPlans]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch recipes.');
      }
    };

    fetchRecipes();
  }, []);

  const addFamilyMember = () => {
    if (!newMemberName || !newMemberRelationship) {
      setErrorMessage('Name and relationship are required.');
      return;
    }

    const membersRef = ref(db, `familyMealPlans/${user?.uid}/members`);
    const newMemberRef = push(membersRef);

    set(newMemberRef, { name: newMemberName, relationship: newMemberRelationship, mealPlans: [] })
      .then(() => {
        setSuccessMessage('Family member added successfully!');
        setErrorMessage('');
        setNewMemberName('');
        setNewMemberRelationship('');
      })
      .catch(() => {
        setErrorMessage('Failed to add family member.');
      });
  };

  const addMealPlan = () => {
    if (!selectedMember || !mealDate || !selectedRecipe) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (editingPlanId) {
      const mealPlanRef = ref(
        db,
        `familyMealPlans/${user?.uid}/members/${selectedMember}/mealPlans/${editingPlanId}`
      );

      update(mealPlanRef, {
        date: mealDate,
        meals: [{ time: mealTime, recipe: selectedRecipe }],
      })
        .then(() => {
          setSuccessMessage('Meal plan updated successfully!');
          setErrorMessage('');
          setEditingPlanId(null);
          fetchMealPlans();
        })
        .catch(() => {
          setErrorMessage('Failed to update meal plan.');
        });
    } else {
      const mealPlansRef = ref(
        db,
        `familyMealPlans/${user?.uid}/members/${selectedMember}/mealPlans`
      );
      const newMealPlanRef = push(mealPlansRef);

      set(newMealPlanRef, {
        date: mealDate,
        meals: [{ time: mealTime, recipe: selectedRecipe }],
      })
        .then(() => {
          setSuccessMessage('Meal plan added successfully!');
          setErrorMessage('');
          fetchMealPlans();
        })
        .catch(() => {
          setErrorMessage('Failed to add meal plan.');
        });
    }
  };

  const editMealPlan = (planId, memberId) => {
    setSelectedMember(memberId);
    const plan = mealPlans.find((p) => p.id === planId);
    if (plan) {
      setMealDate(plan.date);
      setMealTime(plan.meals[0]?.time || 'Breakfast');
      setSelectedRecipe(plan.meals[0]?.recipe || '');
      setEditingPlanId(planId);
    }
  };

  const deleteMealPlan = (planId, memberId) => {
    const mealPlanRef = ref(db, `familyMealPlans/${user?.uid}/members/${memberId}/mealPlans/${planId}`);

    remove(mealPlanRef)
      .then(() => {
        setSuccessMessage('Meal plan deleted successfully!');
        setErrorMessage('');
        fetchMealPlans();
      })
      .catch(() => {
        setErrorMessage('Failed to delete meal plan.');
      });
  };

  const filteredMealPlans = mealPlans.filter((plan) =>
    selectedViewer ? plan.memberId === selectedViewer : true
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center">Family Meal Planner</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <h3>Add Family Member</h3>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            value={newMemberRelationship}
            onChange={(e) => setNewMemberRelationship(e.target.value)}
            className="form-control"
            placeholder="Relationship"
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={addFamilyMember}>
            Add Member
          </button>
        </div>
      </div>

      <h3>{editingPlanId ? 'Edit Meal Plan' : 'Add Meal Plan'}</h3>
      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-control"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value="">Select Member</option>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.relationship})
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={mealDate}
            onChange={(e) => setMealDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={selectedRecipe}
            onChange={(e) => setSelectedRecipe(e.target.value)}
          >
            <option value="">Select Recipe</option>
            {recipes.map((recipe) => (
              <option key={recipe._id} value={recipe._id}>
                {recipe.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-primary mb-4" onClick={addMealPlan}>
        {editingPlanId ? 'Update Meal Plan' : 'Add Meal Plan'}
      </button>

      <h3>Meal Plans</h3>
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-control"
            value={selectedViewer}
            onChange={(e) => setSelectedViewer(e.target.value)}
          >
            <option value="">View All Members</option>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredMealPlans.length === 0 ? (
        <p>No meal plans available for the selected member.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Member</th>
              <th>Date</th>
              <th>Time</th>
              <th>Recipe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMealPlans.map((plan) => (
              <tr key={plan.id}>
                <td>
                  {plan.memberName} ({plan.memberRelationship})
                </td>
                <td>{plan.date}</td>
                {plan.meals.map((meal, idx) => (
                  <React.Fragment key={idx}>
                    <td>{meal.time}</td>
                    <td>{recipes.find((r) => r._id === meal.recipe)?.title || 'Unknown'}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editMealPlan(plan.id, plan.memberId)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteMealPlan(plan.id, plan.memberId)}
                      >
                        Delete
                      </button>
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FamilyMealPlannerPage;
