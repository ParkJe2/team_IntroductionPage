# <-------UUID - 데이터별 고유 ID 생성_제이--------
import uuid
# --------------------제이----------------------->
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient


client = MongoClient('mongodb+srv://four:four123@cluster0.wbrtbvg.mongodb.net/?retryWrites=true&w=majority')
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

# <--------데이터 삭제 기능 POST_제이-----------
@app.route("/delDocument", methods=["POST"])
def delDocument():
    # find_one 한 개 찾기
    find = db.data.find_one({'id': request.form['id'], 'password': request.form['password']})
    print(find)
    if find == None:
        return jsonify({'result':0})
    else:
        # delete_one 지우기
        db.data.delete_one({'id':request.form['id']})
        return jsonify({'result':1})
    # 각 데이터별 고유 아이디와 유저의 비밀번호를 가져와 일치여부 확인 후 일치할 경우 1, 일치하지 않을 경우 0
# --------------제이--------------->

if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)