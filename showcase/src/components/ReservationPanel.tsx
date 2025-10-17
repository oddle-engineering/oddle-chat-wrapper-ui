import React from 'react';

interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  partySize: number;
  status: "pending" | "confirmed" | "cancelled" | "no_show" | "completed";
  specialRequests?: string;
  table?: string;
  created_at: string;
  updated_at?: string;
}

interface ReservationPanelProps {
  reservations: Reservation[];
  onCreateReservation: (reservation: Omit<Reservation, 'id' | 'created_at' | 'status'>) => void;
  onUpdateStatus: (id: string, status: Reservation['status']) => void;
  onCancelReservation: (id: string, reason?: string) => void;
}

export const ReservationPanel: React.FC<ReservationPanelProps> = ({ 
  reservations, 
  onCreateReservation, 
  onUpdateStatus,
  onCancelReservation 
}) => {
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: 2,
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.customerName && formData.email && formData.date && formData.time) {
      onCreateReservation({
        ...formData,
        partySize: Number(formData.partySize)
      });
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        partySize: 2,
        specialRequests: ''
      });
      setShowForm(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      case 'completed': return '#6c757d';
      case 'no_show': return '#fd7e14';
      default: return '#6c757d';
    }
  };

  const statusCounts = reservations.reduce((acc, res) => {
    acc[res.status] = (acc[res.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Reservations ({reservations.length})</h3>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="add-btn"
        >
          {showForm ? 'Cancel' : 'New Reservation'}
        </button>
      </div>

      <div className="status-summary">
        {Object.entries(statusCounts).map(([status, count]) => (
          <span key={status} className="status-chip" style={{ backgroundColor: getStatusColor(status) }}>
            {status}: {count}
          </span>
        ))}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Customer Name *"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <input
              type="number"
              placeholder="Party Size"
              min="1"
              max="20"
              value={formData.partySize}
              onChange={(e) => setFormData({...formData, partySize: parseInt(e.target.value)})}
            />
          </div>
          <div className="form-row">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>
          <textarea
            placeholder="Special Requests"
            value={formData.specialRequests}
            onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
            rows={2}
          />
          <button type="submit" className="submit-btn">Create Reservation</button>
        </form>
      )}

      <div className="reservations-list">
        {reservations.length === 0 ? (
          <div className="empty-state">No reservations yet. Create one above!</div>
        ) : (
          reservations
            .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
            .map((reservation) => (
            <div key={reservation.id} className="reservation-item">
              <div className="reservation-header">
                <h4>{reservation.customerName}</h4>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(reservation.status) }}
                >
                  {reservation.status}
                </span>
              </div>
              
              <div className="reservation-details">
                <div className="detail-row">
                  <span>📧 {reservation.email}</span>
                  {reservation.phone && <span>📞 {reservation.phone}</span>}
                </div>
                <div className="detail-row">
                  <span>📅 {reservation.date}</span>
                  <span>🕐 {reservation.time}</span>
                  <span>👥 {reservation.partySize} guests</span>
                </div>
                {reservation.table && (
                  <div className="detail-row">
                    <span>🪑 Table {reservation.table}</span>
                  </div>
                )}
                {reservation.specialRequests && (
                  <div className="special-requests">
                    <strong>Special Requests:</strong> {reservation.specialRequests}
                  </div>
                )}
              </div>

              <div className="reservation-actions">
                {reservation.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => onUpdateStatus(reservation.id, 'confirmed')}
                      className="action-btn confirm-btn"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => onCancelReservation(reservation.id, 'Customer cancelled')}
                      className="action-btn cancel-btn"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {reservation.status === 'confirmed' && (
                  <>
                    <button 
                      onClick={() => onUpdateStatus(reservation.id, 'completed')}
                      className="action-btn complete-btn"
                    >
                      Complete
                    </button>
                    <button 
                      onClick={() => onUpdateStatus(reservation.id, 'no_show')}
                      className="action-btn no-show-btn"
                    >
                      No Show
                    </button>
                    <button 
                      onClick={() => onCancelReservation(reservation.id, 'Last minute cancellation')}
                      className="action-btn cancel-btn"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};