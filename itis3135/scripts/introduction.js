const defaultProfile = {
  firstName: "Chingtzu",
  middleName: "M.",
  nickname: "Chi",
  lastName: "Lee",
  acknowledgment: "I understand that this is a public document, and I won't put anything here I wouldn't want anyone to see.",
  acknowledgmentDate: "8/20/26",
  prettyNameDivider: "~",
  adjectives: "Courageous",
  animal: "Leopard",
  img: "images/frisbee-next-to-head@divonbriesen-300x300.jpg",
  pictureAlt: "Photo of Chingtzu Lee",
  caption: "A cheerful portrait of Chi.",
  personalInfo: {
    statement: "Hey, I'm Chingtzu Lee, a UNC Charlotte student studying ITIS 3135. I enjoy building clean, functional websites and learning how to make them look good while staying accessible and easy to navigate. Outside of class, I'm into coding, design, and exploring new tech tools that make life easier.",
    personalBackground: "I grew up in Charlotte and have spent most of my life building curiosity around technology, design, and creative problem solving.",
    professionalBackground: "I enjoy hands-on experiences that blend technology and communication, and I am always looking for ways to improve how people interact with digital tools.",
    academicBackground: "I am currently pursuing a degree in Information Technology with a focus on web development and creating user-centered digital experiences.",
    primaryWorkComputer: "A modern laptop running a current operating system and a browser-based toolchain for HTML, CSS, and JavaScript projects.",
    primaryWorkLocation: "UNC Charlotte campus and collaborative study spaces where I can focus and create.",
    alternateComputerLocation: "When I am away from campus, I work from home or coworking spaces with the same development workflow and project notes."
  },
  courses: [
    {
      department: "ITIS",
      courseNumber: "3135",
      courseTitle: "Front-End Web Development",
      reasonForTaking: "This class helps me turn design ideas into polished, usable websites."
    },
    {
      department: "ITIS",
      courseNumber: "2110",
      courseTitle: "Introduction to Information Systems",
      reasonForTaking: "It gives me a stronger foundation in digital systems and how people use them."
    }
  ],
  quote: "The best way to learn is to build, test, iterate, and make the details better each time.",
  quoteAuthor: "Chingtzu Lee",
  funnyThing: "I once tried to debug a small layout issue for so long that I started calling it a personal side quest.",
  somethingToShare: "I like combining technical problem solving with creativity, which is why I enjoy designing webpages that feel both useful and welcoming.",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com" },
    { label: "GitHub", url: "https://github.com" },
    { label: "Portfolio", url: "https://divonbriesen.github.io/teaching/itis3135/" },
    { label: "Course Resources", url: "https://divonbriesen.github.io/teaching/itis3135/" },
    { label: "FreeCodeCamp", url: "https://www.freecodecamp.org" }
  ]
};

const formElement = document.getElementById("form");
const clearButton = document.getElementById("clear-form");
const addCourseButton = document.getElementById("add-course");
const courseContainer = document.getElementById("course-list");
const imagePreview = document.getElementById("image-preview");

function escapeHtml(value) {
  return String(value === null || typeof value === "undefined" ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setFieldValue(id, value) {
  const field = document.getElementById(id);
  if (field) {
    field.value = value === null || typeof value === "undefined" ? "" : value;
  }
}

function addCourseRow(course = {}) {
  const row = document.createElement("div");
  row.className = "course-row";

  row.innerHTML = `
    <div class="course-field">
      <label>Department</label>
      <input type="text" data-course-field="department" value="${escapeHtml(course.department === null || typeof course.department === "undefined" ? "" : course.department)}" placeholder="ITIS" aria-label="Course department">
    </div>
    <div class="course-field">
      <label>Number</label>
      <input type="text" data-course-field="number" value="${escapeHtml(course.courseNumber === null || typeof course.courseNumber === "undefined" ? "" : course.courseNumber)}" placeholder="3135" aria-label="Course number">
    </div>
    <div class="course-field course-title-field">
      <label>Course Title</label>
      <input type="text" data-course-field="title" value="${escapeHtml(course.courseTitle === null || typeof course.courseTitle === "undefined" ? "" : course.courseTitle)}" placeholder="Front-End Web Development" aria-label="Course title">
    </div>
    <div class="course-field course-reason-field">
      <label>Reason</label>
      <input type="text" data-course-field="reason" value="${escapeHtml(course.reasonForTaking === null || typeof course.reasonForTaking === "undefined" ? "" : course.reasonForTaking)}" placeholder="Why are you taking this course?" aria-label="Course reason">
    </div>
    <button type="button" class="remove-course" aria-label="Remove course">Remove</button>
  `;

  const removeButton = row.querySelector(".remove-course");
  removeButton.addEventListener("click", () => row.remove());

  courseContainer.appendChild(row);
}

function setProfileValues(profile) {
  setFieldValue("firstName", profile.firstName);
  setFieldValue("middleName", profile.middleName);
  setFieldValue("nickname", profile.nickname);
  setFieldValue("lastName", profile.lastName);
  setFieldValue("acknowledgment", profile.acknowledgment);
  setFieldValue("acknowledgmentDate", profile.acknowledgmentDate);
  setFieldValue("adjectives", profile.adjectives);
  setFieldValue("animal", profile.animal);
  setFieldValue("prettyNameDivider", profile.prettyNameDivider);
  setFieldValue("img", profile.img);
  setFieldValue("pictureAlt", profile.pictureAlt);
  setFieldValue("caption", profile.caption);
  setFieldValue("statement", profile.personalInfo.statement);
  setFieldValue("personalBackground", profile.personalInfo.personalBackground);
  setFieldValue("professionalBackground", profile.personalInfo.professionalBackground);
  setFieldValue("academicBackground", profile.personalInfo.academicBackground);
  setFieldValue("primaryWorkComputer", profile.personalInfo.primaryWorkComputer);
  setFieldValue("primaryWorkLocation", profile.personalInfo.primaryWorkLocation);
  setFieldValue("alternateComputerLocation", profile.personalInfo.alternateComputerLocation);
  setFieldValue("quote", profile.quote);
  setFieldValue("quoteAuthor", profile.quoteAuthor);
  setFieldValue("funnyThing", profile.funnyThing);
  setFieldValue("somethingToShare", profile.somethingToShare);
  setFieldValue("linkedinUrl", profile.links[0] ? profile.links[0].url : "");
  setFieldValue("githubUrl", profile.links[1] ? profile.links[1].url : "");
  setFieldValue("portfolioUrl", profile.links[2] ? profile.links[2].url : "");
  setFieldValue("courseResourceUrl", profile.links[3] ? profile.links[3].url : "");
  setFieldValue("freeCodeCampUrl", profile.links[4] ? profile.links[4].url : "");

  const existingRows = Array.from(courseContainer.querySelectorAll(".course-row"));
  existingRows.forEach((row) => row.remove());

  if (profile.courses.length === 0) {
    addCourseRow();
    return;
  }

  profile.courses.forEach((course) => addCourseRow(course));
}

function readCourseEntries() {
  return Array.from(courseContainer.querySelectorAll(".course-row"))
    .map((row) => {
      const department = row.querySelector('[data-course-field="department"]').value.trim();
      const courseNumber = row.querySelector('[data-course-field="number"]').value.trim();
      const courseTitle = row.querySelector('[data-course-field="title"]').value.trim();
      const reasonForTaking = row.querySelector('[data-course-field="reason"]').value.trim();

      return {
        department,
        courseNumber,
        courseTitle,
        reasonForTaking
      };
    })
    .filter((course) => Object.values(course).some((value) => value));
}

function collectFormData() {
  const imgInput = document.getElementById("pictureUpload");
  const imageUrlValue = document.getElementById("img").value.trim();
  const customImage = imgInput.files && imgInput.files[0]
    ? URL.createObjectURL(imgInput.files[0])
    : imageUrlValue || defaultProfile.img;

  return {
    firstName: document.getElementById("firstName").value.trim(),
    middleName: document.getElementById("middleName").value.trim(),
    nickname: document.getElementById("nickname").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    acknowledgment: document.getElementById("acknowledgment").value.trim(),
    acknowledgmentDate: document.getElementById("acknowledgmentDate").value.trim(),
    prettyNameDivider: document.getElementById("prettyNameDivider").value.trim() || "~",
    adjectives: document.getElementById("adjectives").value.trim() || defaultProfile.adjectives,
    animal: document.getElementById("animal").value.trim() || defaultProfile.animal,
    img: customImage,
    pictureAlt: document.getElementById("pictureAlt").value.trim() || defaultProfile.pictureAlt,
    caption: document.getElementById("caption").value.trim() || defaultProfile.caption,
    personalInfo: {
      statement: document.getElementById("statement").value.trim() || defaultProfile.personalInfo.statement,
      personalBackground: document.getElementById("personalBackground").value.trim() || defaultProfile.personalInfo.personalBackground,
      professionalBackground: document.getElementById("professionalBackground").value.trim() || defaultProfile.personalInfo.professionalBackground,
      academicBackground: document.getElementById("academicBackground").value.trim() || defaultProfile.personalInfo.academicBackground,
      primaryWorkComputer: document.getElementById("primaryWorkComputer").value.trim() || defaultProfile.personalInfo.primaryWorkComputer,
      primaryWorkLocation: document.getElementById("primaryWorkLocation").value.trim() || defaultProfile.personalInfo.primaryWorkLocation,
      alternateComputerLocation: document.getElementById("alternateComputerLocation").value.trim() || defaultProfile.personalInfo.alternateComputerLocation
    },
    courses: readCourseEntries(),
    quote: document.getElementById("quote").value.trim() || defaultProfile.quote,
    quoteAuthor: document.getElementById("quoteAuthor").value.trim() || defaultProfile.quoteAuthor,
    funnyThing: document.getElementById("funnyThing").value.trim(),
    somethingToShare: document.getElementById("somethingToShare").value.trim(),
    links: [
      { label: "LinkedIn", url: document.getElementById("linkedinUrl").value.trim() || defaultProfile.links[0].url },
      { label: "GitHub", url: document.getElementById("githubUrl").value.trim() || defaultProfile.links[1].url },
      { label: "Portfolio", url: document.getElementById("portfolioUrl").value.trim() || defaultProfile.links[2].url },
      { label: "Course Resources", url: document.getElementById("courseResourceUrl").value.trim() || defaultProfile.links[3].url },
      { label: "FreeCodeCamp", url: document.getElementById("freeCodeCampUrl").value.trim() || defaultProfile.links[4].url }
    ]
  };
}

function clearFormFields() {
  formElement.querySelectorAll("input, textarea").forEach((element) => {
    if (["button", "submit", "reset"].includes(element.type)) {
      return;
    }

    if (element.type === "file") {
      element.value = "";
      return;
    }

    element.value = "";
  });

  Array.from(courseContainer.querySelectorAll(".course-row")).forEach((row) => row.remove());
  addCourseRow();
  document.getElementById("img").value = "";
}

function displayIntroduction(data) {
  const main = document.querySelector("main");
  const fullName = [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ");
  const prettyName = [data.firstName, data.nickname, data.lastName].filter(Boolean).join(` ${data.prettyNameDivider} `);

  main.innerHTML = `
    <h2>Introduction Form</h2>
    <img src="${escapeHtml(data.img)}" alt="${escapeHtml(data.pictureAlt)}" style="width:200px;border-radius:10px;">
    <p>Hey, I'm ${escapeHtml(prettyName)} — a UNC Charlotte student studying ITIS 3135. I enjoy building clean, functional websites and learning how to make them look good while staying accessible and easy to navigate. Outside of class, I'm into coding, design, and exploring new tech tools that make life easier.</p>
    <p>This page is part of my official course site for ITIS 3135, following the structure and requirements outlined by Professor von Briesen.</p>
    <p><strong>Full name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Acknowledgment:</strong> ${escapeHtml(data.acknowledgment)}</p>
    <p><strong>Acknowledgment date:</strong> ${escapeHtml(data.acknowledgmentDate)}</p>
    <p><strong>Preferred name:</strong> ${escapeHtml(data.nickname || data.firstName)}</p>
    <p><strong>Mascot:</strong> ${escapeHtml(data.adjectives)} ${escapeHtml(data.animal)}</p>
    <p><strong>Picture caption:</strong> ${escapeHtml(data.caption)}</p>
    <ul>
      <li><strong>Personal Background:</strong> ${escapeHtml(data.personalInfo.personalBackground)}</li>
      <li><strong>Professional Background:</strong> ${escapeHtml(data.personalInfo.professionalBackground)}</li>
      <li><strong>Academic Background:</strong> ${escapeHtml(data.personalInfo.academicBackground)}</li>
      <li><strong>Primary Work Computer:</strong> ${escapeHtml(data.personalInfo.primaryWorkComputer)}</li>
      <li><strong>Primary Work Location:</strong> ${escapeHtml(data.personalInfo.primaryWorkLocation)}</li>
      <li><strong>Alternate Computer Location:</strong> ${escapeHtml(data.personalInfo.alternateComputerLocation)}</li>
      <li><strong>Personal Statement:</strong> ${escapeHtml(data.personalInfo.statement)}</li>
    </ul>
    <section>
      <h3>Courses</h3>
      <ul>
        ${data.courses.map((course) => `
          <li><strong>${escapeHtml(course.department || "Course")}</strong> ${escapeHtml(course.courseNumber || "")}: ${escapeHtml(course.courseTitle || "Untitled course")} — ${escapeHtml(course.reasonForTaking || "No reason provided")}</li>
        `).join("") || "<li>No courses added.</li>"}
      </ul>
    </section>
    <blockquote>
      “${escapeHtml(data.quote)}”
      <cite>— ${escapeHtml(data.quoteAuthor)}</cite>
    </blockquote>
    <p><strong>Funny thing:</strong> ${escapeHtml(data.funnyThing)}</p>
    <p><strong>Something I would like to share:</strong> ${escapeHtml(data.somethingToShare)}</p>
    <ul>
      ${data.links.map((link) => `
        <li><a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a></li>
      `).join("")}
    </ul>
    <p><a href="introduction_form.html">Reset the form</a></p>
  `;
}

function validateForm() {
  const requiredFields = [
    "firstName",
    "lastName",
    "acknowledgment",
    "acknowledgmentDate",
    "adjectives",
    "animal",
    "statement",
    "personalBackground",
    "professionalBackground",
    "academicBackground",
    "primaryWorkComputer",
    "primaryWorkLocation",
    "alternateComputerLocation",
    "quote",
    "quoteAuthor"
  ];

  const missingRequiredField = requiredFields.some((id) => {
    const element = document.getElementById(id);
    return element && !element.value.trim();
  });

  const incompleteCourse = Array.from(courseContainer.querySelectorAll(".course-row")).some((row) => {
    const values = [
      row.querySelector('[data-course-field="department"]').value.trim(),
      row.querySelector('[data-course-field="number"]').value.trim(),
      row.querySelector('[data-course-field="title"]').value.trim(),
      row.querySelector('[data-course-field="reason"]').value.trim()
    ];
    return values.some(Boolean) && values.some((value) => !value);
  });

  if (missingRequiredField || incompleteCourse) {
    alert("Please complete all required fields before generating or submitting your introduction.");
    return false;
  }

  return true;
}

function toXml(value, elementName = "item") {
  if (Array.isArray(value)) {
    return value.map((item) => toXml(item, "item")).join("");
  }

  if (value !== null && typeof value === "object") {
    const children = Object.entries(value)
      .map(([key, child]) => toXml(child, key))
      .join("");
    return `<${elementName}>${children}</${elementName}>`;
  }

  return `<${elementName}>${escapeHtml(value === null || typeof value === "undefined" ? "" : value)}</${elementName}>`;
}

function createGeneratedHtml(data) {
  const courses = data.courses.map((course) => `
    <li>${escapeHtml(course.department)} ${escapeHtml(course.courseNumber)}:
      ${escapeHtml(course.courseTitle)} — ${escapeHtml(course.reasonForTaking)}
    </li>
  `).join("");

  return `<article>
  <h2>Introduction Form</h2>
  <img src="${escapeHtml(data.img)}" alt="${escapeHtml(data.pictureAlt)}">
  <p><strong>Name:</strong> ${escapeHtml([data.firstName, data.middleName, data.lastName].filter(Boolean).join(" "))}</p>
  <p><strong>Preferred Name:</strong> ${escapeHtml(data.nickname || data.firstName)}</p>
  <p><strong>Acknowledgment:</strong> ${escapeHtml(data.acknowledgment)}</p>
  <p><strong>Mascot:</strong> ${escapeHtml(data.adjectives)} ${escapeHtml(data.animal)}</p>
  <p>${escapeHtml(data.personalInfo.statement)}</p>
  <ul>${courses}</ul>
  <blockquote>${escapeHtml(data.quote)} — ${escapeHtml(data.quoteAuthor)}</blockquote>
</article>`;
}

function generateOutput(format, data) {
  if (format === "html") {
    return createGeneratedHtml(data);
  }

  if (format === "json") {
    return JSON.stringify(data, null, 2);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(data, "introduction")}`;
}

if (formElement) {
  addCourseButton.addEventListener("click", () => addCourseRow());

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    displayIntroduction(collectFormData());
  });

  formElement.querySelectorAll("[data-output-format]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!validateForm()) {
        return;
      }

      const format = button.dataset.outputFormat;
      document.getElementById("generated-output").textContent = generateOutput(format, collectFormData());
      document.getElementById("generated-section").hidden = false;
    });
  });

  document.getElementById("img").addEventListener("input", (event) => {
    if (!document.getElementById("pictureUpload").files.length) {
      imagePreview.src = event.target.value.trim() || defaultProfile.img;
    }
  });

  document.getElementById("pictureUpload").addEventListener("change", (event) => {
    if (event.target.files[0]) {
      imagePreview.src = URL.createObjectURL(event.target.files[0]);
    }
  });

  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      setProfileValues(defaultProfile);
      document.getElementById("pictureUpload").value = "";
      imagePreview.src = defaultProfile.img;
      document.getElementById("generated-section").hidden = true;
    }, 0);
  });

  clearButton.addEventListener("click", () => {
    clearFormFields();
    imagePreview.src = defaultProfile.img;
    document.getElementById("generated-section").hidden = true;
    document.getElementById("firstName").focus();
  });

  setProfileValues(defaultProfile);
}
