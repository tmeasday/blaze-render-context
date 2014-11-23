if (Meteor.isClient) {
  var docs = new Meteor.Collection(null);
  var docId = docs.insert({foo: 'bar'});
  
  Template.showDataFromId.helpers({
    doc: function() {
      return docs.findOne(this.id);
    }
  });
  
  var div = $('<div>').get(0);
  view1 = Blaze.renderWithData(Template.showData, docs.findOne(), div);
  view2 = Blaze.renderWithData(Template.showDataFromId, {id: docId}, div);
  view3 = Blaze.renderWithData(Template.showData, function() { return docs.findOne(); }, div);

  console.log($(div).text());
  
  Template.hello.events({
    'click button': function () {
      docs.update({}, {$set: {foo: 'baz'}});
      Tracker.flush();
      console.log($(div).text());
    }
  });
}