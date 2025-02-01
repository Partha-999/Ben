from flask import Flask, jsonify, request
from flask_cors import CORS
from pyngrok import ngrok

app = Flask(__name__)
CORS(app)

# Sample office seat data
offices = {
    'office1': {'totalSeats': 50, 'occupiedSeats': 20, 'powerUsage': 0.5, 'waterUsage': 2},
    'office2': {'totalSeats': 80, 'occupiedSeats': 40, 'powerUsage': 0.4, 'waterUsage': 1.8},
    'office3': {'totalSeats': 120, 'occupiedSeats': 60, 'powerUsage': 0.3, 'waterUsage': 1.5}
}

@app.route('/get_office_data/<office_id>', methods=['GET'])
def get_office_data(office_id):
    office = offices.get(office_id)
    if office:
        return jsonify(office)
    return jsonify({"error": "Office not found"}), 404

@app.route('/toggle_seat', methods=['POST'])
def toggle_seat():
    office_id = request.json.get('office_id')
    seat_index = request.json.get('seat_index')

    if office_id not in offices:
        return jsonify({"error": "Office not found"}), 404
    
    office = offices[office_id]
    total_seats = office['totalSeats']
    
    if seat_index < 0 or seat_index >= total_seats:
        return jsonify({"error": "Invalid seat index"}), 400
    
    # Toggle seat occupancy
    if seat_index < office['occupiedSeats']:
        office['occupiedSeats'] -= 1
    else:
        office['occupiedSeats'] += 1
    
    return jsonify({"message": "Seat toggled successfully", "occupiedSeats": office['occupiedSeats']})

if __name__ == "__main__":
    # Start Ngrok tunnel
    public_url = ngrok.connect(5000).public_url
    print(f"🚀 Ngrok Public URL: {public_url}")  # Share this link with the jury
    
    # Run Flask app
    app.run(port=5000)
