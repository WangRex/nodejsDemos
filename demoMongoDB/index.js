var mongoose = require("mongoose"); //引用mongoose模块
var db = mongoose.createConnection("localhost", "test"); //创建一个数据库连接

db.on('error', console.error.bind(console, "连接错误:"));
db.once("open", function() {
    //一次打开记录
});

var PersonSchema = new mongoose.Schema({
    name: String //定义一个属性name，类型为String
});

var PersonModel = db.model("Person", PersonSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如下：
//var PersonModel = db.model("Person");
//如果没有发布，上一段代码会异常

var PersonEntity = new PersonModel({
    name: "Rex"
});
//打印这个实体名字看看
// console.log(PersonEntity.name);

// PersonEntity.save();

var nameList = [{
    "name": "Jody1"
}, {
    "name": "Jody2"
}, {
    "name": "Jody3"
}, {
    "name": "Jody4"
}, {
    "name": "Jody5"
}, ];

for (var i = 0; i < nameList.length; i++) {
    var PersonEntity1 = new PersonModel(nameList[i]);
    console.log(PersonEntity1);
    PersonEntity1.remove(nameList[i], function(err, docs) {
        console.log(err);
        console.log(docs);
    });
};

//为Schema模型追加speak方法
/*PersonSchema.methods.speak = function() {
    console.log("My name is " + this.name);
}

var PersonModel = db.model("Person1", PersonSchema);
var personEntity = new PersonModel({
    name: "Rex"
});
personEntity.speak();
*/

PersonModel.find(function(err, persons) {
    //查询到所有person
    // console.log(persons);
});

PersonModel.find({
    name: 'test update'
}, function(err, persons) {
    console.log(persons.length);
    for (var i = 0; i < persons.length; i++) {
        person = persons[i];
        console.log(person);
        var _id = person._id;
        console.log(_id);
        var person1 = {
            name: "Rex"
        };
        // delete person._id; //再将其删除，这里删除的目的是如果是查出来一个person的话，在修改这个的话，需要把_id删除，不然会报错'Mod on _id not allowed'
        //如果是new了一个的话，没有_id就无所谓了。
        console.log(person1);
        //此时才能用Model操作，否则报错
        PersonModel.update({
            _id: _id
        }, person1, function(err) {
            console.log(err);
            PersonModel.find({
                name: 'Rex'
            }, function(err, persons) {
                console.log(persons);
            });
        });
    };

})
