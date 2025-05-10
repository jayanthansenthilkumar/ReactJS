from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
import json
import os  # Add this import

app = Flask(__name__)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['Padmasaliar']
users_collection = db['Admin']

# Helper function to convert ObjectId to string
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

# Read HTML file
def get_dashboard_html():
    try:
        with open(os.path.join(os.path.dirname(__file__), 'index.html'), 'r', encoding='utf-8') as file:
            return file.read()
    except FileNotFoundError:
        return "Error: Dashboard HTML file not found", 500

@app.route('/')
def index():
    return get_dashboard_html()

# API Endpoints
@app.route('/api/users', methods=['GET'])
def get_users():
    users = list(users_collection.find())
    return JSONEncoder().encode(users)

@app.route('/api/users', methods=['POST'])
def add_user():
    try:
        user_data = request.json
        
        # Validate required fields
        if not user_data.get('name') or not user_data.get('email'):
            return jsonify({"error": "Name and email are required"}), 400
        
        # Normalize data
        user_data = {k: v.strip() if isinstance(v, str) else v 
                     for k, v in user_data.items()}
        
        # Check email uniqueness
        if users_collection.find_one({'email': user_data['email']}):
            return jsonify({"error": "Email already exists"}), 400
        
        result = users_collection.insert_one(user_data)
        new_user = users_collection.find_one({'_id': result.inserted_id})
        
        return JSONEncoder().encode(new_user), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/users/<id>', methods=['GET'])
def get_user(id):
    user = users_collection.find_one({'_id': ObjectId(id)})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return JSONEncoder().encode(user)

@app.route('/api/users/<id>', methods=['PUT'])
def update_user(id):
    try:
        user_data = request.json
        
        # Validate required fields
        if not user_data.get('name') or not user_data.get('email'):
            return jsonify({"error": "Name and email are required"}), 400
        
        # Normalize data
        user_data = {k: v.strip() if isinstance(v, str) else v 
                     for k, v in user_data.items()}
        
        # Check email uniqueness for other users
        existing = users_collection.find_one({
            'email': user_data['email'],
            '_id': {'$ne': ObjectId(id)}
        })
        if existing:
            return jsonify({"error": "Email already exists"}), 400
        
        result = users_collection.update_one(
            {'_id': ObjectId(id)},
            {'$set': user_data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404
            
        updated_user = users_collection.find_one({'_id': ObjectId(id)})
        return JSONEncoder().encode(updated_user)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/users/<id>', methods=['DELETE'])
def delete_user_api(id):
    result = users_collection.delete_one({'_id': ObjectId(id)})
    
    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404
        
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)
