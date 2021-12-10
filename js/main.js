const links = [
    { label: 'Week01', url: 'week1/w01_notes.html' },
    { label: 'Week02', url: 'week2/w02_notes.html' },
    { label: 'Week03', url: 'week3/w03_notes.html' },
    { label: 'Week04', url: 'week4/w04_notes.html' },
    { label: 'Week05', url: 'week5/w05_notes.html' },
    { label: 'Todo App', url: 'todo/index.html' },
    { label: 'Week06', url: 'week6/w06_notes.html' },
    { label: 'Week07', url: 'week7/w07_notes.html' },
    { label: 'Week08', url: 'week8/w08_notes.html' },
    { label: 'Week09', url: 'week9/w09_notes.html' },
    { label: 'Week10', url: 'week10/w10_notes.html' },
    { label: 'Weather App', url: 'weather/index.html' },
];

let list = document.getElementById('tableOfContents');

links.forEach(item => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = item.url;
    a.innerText = item.label;
    li.appendChild(a);

    list.appendChild(li);
});
