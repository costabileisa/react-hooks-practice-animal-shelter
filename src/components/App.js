import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onChangeType(type) {
    setFilters({ type: type })
  }

  function onFindPetsClick() {
    let fetchFilter;
    if (filters.type === "all") {
        fetchFilter = "";
    } else {
        fetchFilter = `?type=${filters.type}`
    }
    fetch(`http://localhost:3001/pets${fetchFilter}`)
    .then(res => res.json())
    .then(data => setPets(data))
  }

  function onAdoptPet(id) {
    const updatedPets = pets.map(pet => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    setPets(updatedPets);
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet={onAdoptPet} pets={pets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
