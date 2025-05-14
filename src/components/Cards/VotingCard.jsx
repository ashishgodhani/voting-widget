import { useState, useEffect } from 'react';
import './VotingCard.css';
import VotingButton from '../Model/VotingButton';
import AddCardModal from '../Model/AddCardModal';

const VotingCard = ({ votingData }) => {
  const [cards, setCards] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setCards(votingData);
  }, [votingData]);

  const openModal = (idx) => {
    setEditingIndex(idx);
  };

  const closeModal = () => {
    setEditingIndex(null);
  };

  const handleSave = (form) => {
    const updated = [...cards];
    updated[editingIndex] = {
      ...updated[editingIndex],
      title: form.title,
      description: form.description,
    };
    setCards(updated);
    localStorage.setItem('votingData', JSON.stringify(updated));
    setEditingIndex(null);
  };

  const handleDelete = (indexToDelete) => {
  const updated = cards.filter((_, i) => i !== indexToDelete);
  setCards(updated);
  localStorage.setItem('votingData', JSON.stringify(updated));
};

  return (
    <div className="like-dislike-container">
      <div className="voting-card-container">
        {cards.map((data, index) => (
          <div className="voting-card" key={data.title || index}>
            <div className='edit-btn-container'>
              <button className="edit-btn" onClick={() => openModal(index)}>
                Edit
              </button>
               <button className="delete-btn" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
            <ul>
              <li>
                <div className="voting-img">
                  <figure>
                    <img src={data.image} alt="voting image" />
                  </figure>
                </div>
                <div className="voting-title">
                  <h1>{data.title}</h1>
                </div>
                <div className="voting-type">
                  <h1>{data.description}</h1>
                </div>
                <div className="subscribe-container">
                  <button className="subscribe-btn" aria-label="Go to subscription link">
                    <a href={data.button.url} target="_blank" rel="noopener noreferrer">
                      {data.button.label}
                    </a>
                  </button>
                </div>
              </li>
            </ul>

            <VotingButton data={data} cardIndex={index} />
          </div>
        ))}
      </div>

      {editingIndex !== null && (
        <AddCardModal
          onAdd={handleSave}
          onClose={closeModal}
          initialValues={{
            title: cards[editingIndex].title,
            description: cards[editingIndex].description,
            imageFile: null,
            imageUrl: cards[editingIndex].image,
          }}
          isEditMode={true}
        />
      )}
    </div>
  );
};

export default VotingCard;
