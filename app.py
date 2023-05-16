
import uuid
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://four:four123@cluster0.wbrtbvg.mongodb.net/?retryWrites=true&w=majority')
db = client.four

@app.route('/')
def home():
  return render_template('index.html')

# < 닉네임, 비밀번호, 코멘트 POST >
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



# < 닉네임, 코멘트 GET >
@app.route("/comment", methods=["GET"])
def comment_get():
    # data에 있는 값을을 sort기능을 통해 최신데이터에 제일 위로 오게 가져와서 all_comments에 넣음
    all_comments = list(db.data.find({},{'_id':False}).sort('_id', -1))
    return jsonify({'result': all_comments})

# <    >
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
  app.run('0.0.0.0', port=4001, debug=True)