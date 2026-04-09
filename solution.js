// j'utilise 'const' car ces objets ne seront pas reassignes (on fera pas student1 = autreChose). le contenue de l'objet peut changer, mais pas la reference. 'let'  serait pour des variables qu'on  reassignera.
const student1 = {name: 'Marie', age: 22, city: 'Yaounde', skills: ['HTML', 'CSS']};
const student2 = {name: 'Paul', age: 25, city: 'Douala', skills: ['PYTHON', 'SQL']};

//on destructure ici car cela nous evite d'ecrire 'student.city' dans le corps et rend la signature expressive : on voit immediatement que la fonction a besoin d'un objet avec une propriete 'city'.
const getCity = ({city}) => city;

//on fusion les deux tableaux  de competences  Template literal : construit la chaine  de facon lisible avec ${}
const buildProfile = (student, extraSkills) => {
    const {name, age} = student;
    const allSkills = [...student.skills, ...extraSkills];
    return `${name} ({$age}) de ${getCity(student)} | Comp.: ${allSkills.join(', ')}`;
};

//quand on retourne un objet avec une fonction fleche, on doit l'entourer de parentheses pour ne pas avec les accolades de bloc.
const mergeStudents = (s1, s2) => ({
    name: `${s1.name} & ${s2.name}`,
    city: 'Cameroun'
});

console.log(buildProfile(student1, ['javaScript', 'React']));
console.log(mergeStudents(student1, student2));
console.log(colectNames(student1, student2));
