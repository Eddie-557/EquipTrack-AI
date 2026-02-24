# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import easyocr
import os

app = Flask(__name__)
CORS(app)
reader = easyocr.Reader(['en'])


@app.route('/', methods=['GET'])
def home():
    return "EquipTrack Backend is LIVE! Send a POST request to /scan to process images."


@app.route('/scan', methods=['POST'])
def scan_equipment():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    img = request.files['image']
    img_path = "temp_scan.jpg"
    img.save(img_path)

    results = reader.readtext(img_path, detail=0)
    os.remove(img_path)

    return jsonify({
        "detected_text": results,
        "status": "Success",
        "next_maintenance": "2026-05-18"
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
