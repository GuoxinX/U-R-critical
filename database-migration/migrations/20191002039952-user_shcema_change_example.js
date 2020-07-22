module.exports = {
  async up(db) {
    // for mongodb version >= 4.2.0
    // await db.collection('users').updateMany({},{$set: {test: {$concat: ["$firstName", " ", "$username"]}}});
    // for mongodb version < 4.2.0
    await db.collection('users').find().forEach(function(user) {
      db.collection('users').updateOne({'_id': user._id},{$set: {name: user.firstname + " " + user.username}});
    });
  },

  async down(db) {
    await db.collection('users').updateMany({},{$unset: {name:1}});
  }
};
