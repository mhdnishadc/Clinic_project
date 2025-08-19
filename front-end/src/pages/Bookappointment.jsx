import React, { useState, useEffect } from "react";
import api from "../services/Api";

function BookAppointment() {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [doctor, setDoctor] = useState("");
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctor list from API
    api.get("/doctors/")
      .then((res) => setDoctors(res.data))
      .catch(() => setError("Error fetching doctors"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/appointments/", {
        patient_name: patientName,
        age,
        appointment_date: date,
        slot,
        doctor,   // ✅ doctor id from dropdown
      });
      alert("Appointment booked!");
      window.location.href = "/appointments";
    } catch (err) {
      setError("Error booking appointment. Check details.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        
        <div className="mb-3">
          <label className="form-label">Patient Name</label>
          <input type="text" className="form-control"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Slot</label>
          <input type="number" className="form-control"
            value={slot}
            onChange={(e) => setSlot(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor</label>
          <select className="form-select" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Book</button>
      </form>

      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}

export default BookAppointment;
