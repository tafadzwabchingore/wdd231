// -----------------------------------------------
// COURSE DATA
// -----------------------------------------------
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// -----------------------------------------------
// DOM ELEMENTS
// -----------------------------------------------
const courseListContainer = document.querySelector('.course-list-container');
const totalCreditsElement = document.getElementById('total-credits');

// Filter buttons
const filterAll = document.getElementById('filter-all');
const filterCSE = document.getElementById('filter-cse');
const filterWDD = document.getElementById('filter-wdd');
const filterITM = document.getElementById('filter-itm');


// -----------------------------------------------
// MODAL USING <dialog>
// -----------------------------------------------

// Function to display the modal
function displayCourseDetails(course) {
    const dialog = document.getElementById('course-details');

    dialog.innerHTML = `
        <button class="close-btn">Close</button>

        <h2>${course.subject} ${course.number}</h2>

        <p><strong>Title:</strong> ${course.title}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p><strong>Technology Stack:</strong> ${course.technology.join(', ')}</p>

        <h3>Description</h3>
        <p>${course.description}</p>
    `;

    dialog.showModal();

    // Close button inside modal
    dialog.querySelector(".close-btn").addEventListener("click", () => {
        dialog.close();
    });

    // Close modal when clicking outside inner box
    dialog.addEventListener("click", (event) => {
        const rect = dialog.getBoundingClientRect();
        const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!inside) dialog.close();
    });
}


// -----------------------------------------------
// COURSE DISPLAY LOGIC
// -----------------------------------------------

// Function to create & display course cards
function displayCourses(coursesToDisplay) {
    courseListContainer.innerHTML = '';

    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        if (course.completed) {
            courseCard.classList.add('completed');
        }

        // Make cards interactive + accessible
        courseCard.setAttribute('role', 'button');
        courseCard.setAttribute('tabindex', '0');

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
        `;

        // Click event → open modal
        courseCard.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        // Keyboard accessibility
        courseCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                displayCourseDetails(course);
            }
        });

        courseListContainer.appendChild(courseCard);
    });

    calculateTotalCredits(coursesToDisplay);
}


// -----------------------------------------------
// CREDIT TOTAL
// -----------------------------------------------
function calculateTotalCredits(coursesToDisplay) {
    const totalCredits = coursesToDisplay.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}


// -----------------------------------------------
// FILTER LOGIC
// -----------------------------------------------
function setActiveButton(activeButton) {
    const buttons = [filterAll, filterCSE, filterWDD, filterITM];
    buttons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

filterAll.addEventListener('click', () => {
    displayCourses(courses);
    setActiveButton(filterAll);
});

filterCSE.addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
    setActiveButton(filterCSE);
});

filterWDD.addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
    setActiveButton(filterWDD);
});

filterITM.addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'ITM'));
    setActiveButton(filterITM);
});


// -----------------------------------------------
// INITIALIZE
// -----------------------------------------------
displayCourses(courses);