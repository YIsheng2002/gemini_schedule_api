const User = function(user){
    this.id = user.id;
    this.age = user.age;
    this.email = user.email;
    this.gender = user.gender;
    this.name = user.name;
    this.weight = user.weight;
    this.height = user.height;
    this.goal_calories = user.goal_calories;
    this.area_of_living = user.area_of_living;
    this.health_history = user.health_history;
    this.no_of_family_member = user.no_of_family_member;
    this.occupation_time = user.occupation_time;
    this.occupation_type = user.occupation_type;
}

module.exports = { User }