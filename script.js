// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.

        if(course.id !== ag.course_id){
            throw ("Error - The Assignment group does not correspond with the Course.")
        }
        console.log("=================================")
        const studentScores = {};

        submissions.forEach(sub => {
            //store each submission into an object
            const {learner_id, assignment_id, submission} = sub
            let assignment = null; 

            for(let i = 0; i < ag.assignments.length; i++){
                if(ag.assignments[i].id === assignment_id){
                    assignment = ag.assignments[i]
                    console.log("Showing results for the assignment :" + assignment.name);
                    break;
                }
            }
            //if the assignment does not exist or if the points possible is 0 
            // return nothing
            if(!assignment || assignment.points_possible === 0){
                return; 
            }

            if(assignment.due_at < submission.submitted_at){
                console.log("This assignment is late. A 10% penalty will deducted to this assingment")
                submission.score = submission.score - (assignment.points_possible * .10) // 10 percent
            }

            if(!studentScores[learner_id]){
                studentScores[learner_id] = {totalScore: 0, pointsPossible: 0, totalAssignments: {}}
            }

            //Calculate Score for each assignment
            if(assignment.due_at >= submission.submitted_at){
                const totalPossiblePoints = assignment.points_possible
                let score = submission.score

                studentScores[learner_id].pointsPossible = studentScores[learner_id].pointsPossible + totalPossiblePoints;

                studentScores[learner_id].totalScore = studentScores[learner_id].totalScore + score;

                studentScores[learner_id].totalAssignments[assignment_id] = (score / totalPossiblePoints)
            }
        })
            // const result = [
    //     {
    //         id: 125,
    //         avg: 0.985, // (47 + 150) / (50 + 150)
    //         1: 0.94, // 47 / 50
    //         2: 1.0 // 150 / 150
    //     },
    //     {
    //         id: 132,
    //         avg: 0.82, // (39 + 125) / (50 + 150)
    //         1: 0.78, // 39 / 50
    //         2: 0.833 // late: (140 - 15) / 150
    //     }
    // ]; RESULT SHOULD LOOK SIMIILAR
    let result;
    result = [];
    //for each learner in the student scores object
    //we want to iterate thru the object to get all of the scores for each learner
    //we then want to calculate the average
    
    for(const learner_id in studentScores){
        const studentData = studentScores[learner_id]
        let weightedAverage = 0;
        if(studentData.pointsPossible > 0){
            weightedAverage = studentData.totalScore / studentData.pointsPossible
        }

        //construct a student object and push it to the result array
        // Number() converts a string or other value to the Number type
        //parseFloat() returns a floating point number
        const studentObject = {id: Number(learner_id), avg: parseFloat(weightedAverage)}
        for(const assignment_id in studentData.totalAssignments){
            studentObject[assignment_id] = studentData.totalAssignments[assignment_id]
        }
        result.push(studentObject);
    }
    return result;
}


try{
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(result)
} catch(error){
    console.log(error)
}

/**
 * Returns the day as YYYY-MM-DD
 * aquired from https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 */
// const date = new Date().toISOString().split('T')[0];
// console.log(date)
// try{

// } else{
//     throw "Error - The Assignment group does not correspond with the Course."
// }
// } catch(error){
// console.log(error)
// }
