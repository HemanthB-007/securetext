from flask import Flask, request, jsonify
from flask_cors import CORS
from encryptor import caesar_encrypt, caesar_decrypt

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "SecureText API Running"

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.get_json()
    text = data.get("text", "")
    result = caesar_encrypt(text)
    return jsonify({"encrypted": result})

@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.get_json()
    text = data.get("text", "")
    result = caesar_decrypt(text)
    return jsonify({"decrypted": result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
