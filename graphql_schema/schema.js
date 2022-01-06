const graphql = require('graphql');
const User =require('../model/userSchema');
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({

        id: { type: GraphQLString  },
        radio1: { type: GraphQLString },
        radio2:{ type: GraphQLString },
          university: {type: GraphQLString },
          cgpa:{type: GraphQLString},
          degree:{type: GraphQLString},
          transcript: {type: GraphQLString},
          cities:{type: new GraphQLList(cities)},
          skills: {type: new GraphQLList(skills)},
          salary: { type: GraphQLString },
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
    })
});
const cities = new GraphQLObjectType({
    name: 'Cities',
    fields: {
        city:{type:GraphQLString},
        lng:{type:GraphQLString},
        lat:{type:GraphQLString},

    }
  });
  const skills = new GraphQLObjectType({
    name: 'Skills',
    fields: {
        language:{type:GraphQLString},
        experience:{type:GraphQLString},
        
        

    }
  });
  //for args
  const citiesInput = new GraphQLInputObjectType({
    name: 'CitiesInput',
    fields: {
        city:{type:GraphQLString},
        lng:{type:GraphQLString},
        lat:{type:GraphQLString},

    }
  });
  const skillsInput = new GraphQLInputObjectType({
    name: 'SkillsInput',
    fields: {
        language:{type:GraphQLString},
        experience:{type:GraphQLString},
        
        

    }
  });
  const filters = new GraphQLInputObjectType({
    name: 'FiltersInput',
    fields: {
        sal:{type: GraphQLInt},
        skills: {type: new GraphQLList(GraphQLString)},
        location:{type: new GraphQLList(GraphQLString)},
        experience: { type: new GraphQLList(GraphQLString) },
        
        

    }
  });


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: new GraphQLList(UserType),
            args: { 
                    filter: {type: filters},
                   
               },
            resolve(parent, args){
                var conditions= {};
                var and_clauses=[];
                console.log(args)
                if((args.filter.skills).length>0){
                  and_clauses.push({'skills':{$elemMatch:{language:{$in:args.filter.skills}}}});
                  // add to the query object
                }
                
                if(args.filter.sal){ // if the criteria has a value or values
                  console.log("yes sal is available");
                  and_clauses.push({'salary':{$gte:args.filter.sal}});  
                  // add to the query object
                }
                if((args.filter.experience).length>0){ // if the criteria has a value or values
                  
                  and_clauses.push({'radio1':{$in:args.filter.experience}});  
                  // add to the query object
                }
                
                
              
              
                
              if(and_clauses.length > 0){ 
                conditions['$and'] = and_clauses; // filter the search by any criteria given by the user
              }

                return User.find(conditions);
            }
        },
        
        
        
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery,
    
});
