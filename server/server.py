from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This line enables CORS for the entire app.

@app.route('/extract-instrumentals', methods=['POST'])
def extract_instrumentals():
    print("hello")
    return jsonify(message="Script executed"), 200

if __name__ == '__main__':
    app.run(port=5000)
