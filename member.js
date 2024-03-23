function skillsMember() {
  var member = {
    name: 'John Doe',
    age: 25,
    skills: ['JavaScript', 'HTML', 'CSS'],
    getSkills: function() {
      return this.skills;
    }
  };

  return member;
}