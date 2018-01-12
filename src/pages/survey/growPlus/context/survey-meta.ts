export default [
    {
        label: "How many benches do you have?",
        isQuestion: "TRUE",
        controlName: "q1.1",
        type: "number",
        options: {
            validator: 'required'
        }
    },
   
    {
        label: "From 1 (most fertile) to {{q1.1}} (least fertile), which benches did you use as your ‘fertile’; ‘moderate’; ‘infertile’ bench?",
        isQuestion: "TRUE",
        controlName: "q1.2",
        type: "select",
        options: {
            dynamicOptions:'q1.1',
            repeats:['Fertile','Moderate','Infertile']
        }
    },
    {
        label: "What soil description would you give to the bench described as each type",
        isQuestion: "TRUE",
        controlName: "q2",
        type: "repeat",
        options: {
            repeatAs: 'benchType',
            repeats: ['fertile', 'moderate', 'infertile']
        }
    },
    {
        label: "$benchType",
        isQuestion: "TRUE",
        controlName: "q2.1",
        type: "select",
        options: null
    },
    {
        label: "",
        isQuestion: "TRUE",
        controlName: "q3",
        type: "repeat",
        options: {
            repeatAs: 'benchType',
            repeats: ['fertile', 'moderate', 'infertile']
        }
    },
    {
        label: "Which of these weeds have you seen growing on the benches that you have described as $benchType",
        isQuestion: "TRUE",
        controlName: "q3.1",
        type: "select",
        options: null
    },
    {
        label: "",
        isQuestion: "TRUE",
        controlName: "q4",
        type: "repeat",
        options: {
            repeatAs: 'benchType',
            repeats: ['fertile', 'moderate', 'infertile']
        }
    },
    {
        label: "What is the soil texture on the benches that you have described as $benchType",
        isQuestion: "TRUE",
        controlName: "q4.1",
        type: "select",
        options: null
    }
]