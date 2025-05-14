import  { useState, useEffect } from 'react'
import './App.css'
import VotingCard from './components/Cards/VotingCard'
import fetchAPIData from './api/fetchService'
import AddCardModal from './components/Model/AddCardModal'

function App() {
  const [votingData, setVotingData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortOption, setSortOption] = useState('highest')


  useEffect(() => {
    const stored = localStorage.getItem('votingData')
    if (stored) {
      setVotingData(JSON.parse(stored))
      setLoading(false)
    } else {
      const fetchData = async () => {
        try {
          const res = await fetchAPIData()
          setVotingData(res.data)
          localStorage.setItem('votingData', JSON.stringify(res.data))
        } catch (err) {
          console.error('Failed to fetch voting data:', err)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [])

  // Merge any user votes into the base data for accurate sorting
  const getMergedData = () => {
    const userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}')
    return votingData.map(item => {
      const key = item.title // or use a unique id
      if (userVotes[key]) {
        return {
          ...item,
          votes: userVotes[key].votes
        }
      }
      return item
    })
  }

  const sortedData = [...getMergedData()].sort((a, b) => {
    const totalA = a.votes.up + a.votes.down
    const totalB = b.votes.up + b.votes.down
    return sortOption === 'highest' ? totalB - totalA : totalA - totalB
  })

  const handleSortChange = (e) => setSortOption(e.target.value)

  const handleDataReset = () => {
    localStorage.removeItem('votingData')
    localStorage.removeItem('userVotes')
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
        <p>Loading...</p>
      </div>
    )
  }

  if (sortedData.length === 0 && !loading) {
  return (
    <>
    <button className="subscribe-btn" onClick={handleDataReset} aria-label="Reset voting data">
      Reset Data
    </button>
    <div className="no-data-container">
      
      <p>No cards available.</p>
      <button onClick={() => setShowAddModal(true)} className="add-card-btn">+ Add First Card</button>

      {showAddModal && (
        <AddCardModal
        onAdd={(card) => {
          const updated = [...votingData, card];
          setVotingData(updated);
          localStorage.setItem('votingData', JSON.stringify(updated));
          setShowAddModal(false);
        }}
        onClose={() => setShowAddModal(false)}
        isEditMode={false}
        />
      )}
    </div>
    </>
  );
}


  return (
    <div>
      <div className="header-info">
        <button className="subscribe-btn" onClick={handleDataReset} aria-label="Reset voting data">
          Reset Data
        </button>
        <select className="header-select" onChange={handleSortChange} value={sortOption}>
          <option value="lowest">Lowest Votes</option>
          <option value="highest">Highest Votes</option>
        </select>
         <div className='add-data-btn'>
          <button onClick={() => setShowAddModal(true)} className="add-card-btn">+ Add New Card</button>
        </div>
      </div>
    
    <VotingCard votingData={sortedData} />

      {showAddModal && (
        <AddCardModal
          onAdd={card => {
            const updated = [...votingData, card];
            setVotingData(updated);
            localStorage.setItem('votingData', JSON.stringify(updated));
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
          isEditMode={false}
        />
      )}
    </div>
  )
}

export default App