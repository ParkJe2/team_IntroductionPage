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

# < ---------------------------------------------- 김영빈 --------------------------------  >

# < 2. 서버 닉네임, 비밀번호, 코멘트 POST >
@app.route("/comment", methods=["POST"])
def comment_post():
    name_receive = request.form['name_give']
    password_receive = request.form['password_give']
    comment_receive = request.form['comment_give']
    # document 만들어서 저장
    doc = {
        # 응원 댓글 쓴 사람의 고유 id를 저장
        'id':str(uuid.uuid1()),
        # name, password, comment 저장
        'name':name_receive,
        'password':password_receive,
        'comment':comment_receive
    }
    # data라는 컬렉션 db에 doc 저장
    db.data.insert_one(doc)
    # 등록 완료라는 창을 띄워줌
    return jsonify({'msg': '응원 등록 완료!'})

# < 3. 닉네임, 코멘트 GET >
@app.route("/comment", methods=["GET"])
def comment_get():
    # data에 있는 값을을 sort기능을 통해 최신데이터에 제일 위로 오게 가져와서 all_comments에 넣음
    all_comments = list(db.data.find({},{'_id':False}).sort('_id', -1))
    # 받아온 값 result가 all_comments가 된다
    return jsonify({'result': all_comments})
# -------------------------------------------------------------김영빈 --------------------

# <--------데이터 삭제 기능 POST_제이-----------
@app.route("/delDocument", methods=["POST"])
def delDocument():
    # find_one 한 개 찾기
    find = db.data.find_one({'id': request.form['id'], 'password': request.form['password']})
    if find == None:
        return jsonify({'result':0})
    else:
        # delete_one 지우기
        db.data.delete_one({'id':request.form['id']})
        return jsonify({'result':1})
    # 각 데이터별 고유 아이디와 유저의 비밀번호를 가져와 일치여부 확인 후 일치할 경우 1, 일치하지 않을 경우 0

    # 데이터 수정 기능 POST ++추가
@app.route("/editDocument", methods=["POST"])
def editDocument():
    # find_one 한 개 찾기
    find = db.data.find_one({'id': request.form['id'], 'password': request.form['password']})

    if find == None:
        return jsonify({'result':0})
    else:
        # update_one 변경하기
        db.data.update_one({'id':request.form['id']},{"$set": {"name":request.form['name'], "comment":request.form['comment']}})
        return jsonify({'result':1})
    # 각 데이터별 고유 아이디와 유저의 비밀번호를 가져와 일치여부 확인 후 일치할 경우 1, 일치하지 않을 경우 0

# --------------제이--------------->

if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)