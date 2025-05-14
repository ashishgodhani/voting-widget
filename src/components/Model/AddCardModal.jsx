import  { useState } from 'react';
import './AddCardModal.css';

const AddCardModal = ({ onAdd, onClose, initialValues = {}, isEditMode = false }) => {
const [form, setForm] = useState({
  title: initialValues.title || '',
  description: initialValues.description || '',
  imageFile: null,
  imageUrl: initialValues.imageUrl || '',
});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, imageFile: file, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const newCard = {
      title: form.title,
      description: form.description,
      image: form.imageUrl || 'https://via.placeholder.com/300x150',
      votes: { up: 0, down: 0 },
      button: { label: 'Visit', url: '#' },
    };

    if (isEditMode) {
      onAdd(newCard);
    } else {
      const existing = JSON.parse(localStorage.getItem('votingData')) || [];
      const updated = [...existing, newCard];
      localStorage.setItem('votingData', JSON.stringify(updated));
      onAdd(newCard);
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{isEditMode ? 'Edit Card' : 'Add New Card'}</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="modal-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="modal-textarea"
            />
          </div>
          {!isEditMode && (
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="preview-image" />}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={handleSubmit} className="modal-save-btn">{isEditMode ? 'Save' : 'Add'}</button>
          <button onClick={onClose} className="modal-cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;