import uuid
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi 


client = MongoClient('mongodb+srv://four:four123@cluster0.wbrtbvg.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=certifi.where())
db = client.four

@app.route('/')
def home():
    return render_template('index.html')

# < POST >
@app.route("/comment", methods=["POST"])
def comment_post():
    name_receive = request.form['name_give']
    password_receive = request.form['password_give']
    comment_receive = request.form['comment_give']
    doc = {
        'id':str(uuid.uuid1()),
        'name':name_receive,
        'password':password_receive,
        'comment':comment_receive
    }
    db.data.insert_one(doc)

    return jsonify({'msg': '응원 등록 완료!'})

# < GET >
@app.route("/comment", methods=["GET"])
def comment_get():
    all_comments = list(db.data.find({},{'_id':False}).sort('_id', -1))
    return jsonify({'result': all_comments})

@app.route("/delDocument", methods=["POST"])
def delDocument():
    find = db.data.find_one({'id': request.form['id'], 'password': request.form['password']})
    print(find)
    if find == None:
        return jsonify({'result':0})
    else:
        db.data.delete_one({'id':request.form['id']})
        return jsonify({'result':1})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)