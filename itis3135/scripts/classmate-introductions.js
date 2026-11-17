const classmateList = document.getElementById("classmate-list");
const classmateStatus = document.getElementById("classmate-status");
const allowedApiOrigin = "https://webpages.charlotte.edu";

function getText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function appendText(parent, tagName, className, text) {
  if (!text) {
    return;
  }

  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  element.textContent = text;
  parent.appendChild(element);
}

function createClassmateCard(username, submission) {
  const data = submission.introductionData && typeof submission.introductionData === "object"
    ? submission.introductionData
    : {};
  const personalInfo = data.personalInfo && typeof data.personalInfo === "object"
    ? data.personalInfo
    : {};
  const firstName = getText(data.firstName);
  const middleName = getText(data.middleName);
  const lastName = getText(data.lastName);
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ") || username;
  const nickname = getText(data.nickname);
  const mascot = [getText(data.adjectives), getText(data.animal)].filter(Boolean).join(" ");

  const card = document.createElement("article");
  card.className = "classmate-card";

  const imageSource = getText(data.img);
  if (imageSource) {
    const figure = document.createElement("figure");
    figure.className = "classmate-photo";

    const image = document.createElement("img");
    image.src = imageSource;
    image.alt = getText(data.pictureAlt) || `Portrait for ${fullName}`;
    image.loading = "lazy";
    image.decoding = "async";
    figure.appendChild(image);

    appendText(figure, "figcaption", "", getText(data.caption));
    card.appendChild(figure);
  }

  appendText(card, "h3", "classmate-card-title", fullName);
  if (nickname && nickname !== firstName) {
    appendText(card, "p", "", `Preferred name: ${nickname}`);
  }
  appendText(card, "p", "classmate-mascot", mascot ? `Mascot: ${mascot}` : "");
  appendText(card, "p", "", getText(personalInfo.statement));

  const quote = getText(data.quote);
  if (quote) {
    const quoteElement = document.createElement("blockquote");
    quoteElement.textContent = quote;

    const quoteAuthor = getText(data.quoteAuthor);
    if (quoteAuthor) {
      const citation = document.createElement("cite");
      citation.textContent = quoteAuthor;
      quoteElement.appendChild(citation);
    }

    card.appendChild(quoteElement);
  }

  return card;
}

async function loadClassmateIntroductions() {
  let submissions;
  try {
    const response = await fetch("https://intro-form.tommyhost.ing/");
    if (!response.ok) {
      throw new Error(`Introduction service returned ${response.status}`);
    }

    submissions = await response.json();
  } catch (error) {
    if (window.location.origin !== allowedApiOrigin) {
      classmateStatus.textContent = `The introduction API only allows requests from ${allowedApiOrigin}. Open this page on the hosted course site; local file and localhost previews cannot load live profiles.`;
      return;
    }

    classmateStatus.textContent = error instanceof Error
      ? `Classmate introductions could not be loaded: ${error.message}`
      : "Classmate introductions could not be loaded right now.";
    return;
  }

  if (!submissions || typeof submissions !== "object" || Array.isArray(submissions)) {
    classmateStatus.textContent = "The introduction service returned data in an unexpected format.";
    return;
  }

  const entries = Object.entries(submissions).sort(([, first], [, second]) => {
    return getText(second && second.lastUpdated).localeCompare(getText(first && first.lastUpdated));
  });

  if (entries.length === 0) {
    classmateStatus.textContent = "No classmate introductions have been submitted yet.";
    return;
  }

  const cards = document.createDocumentFragment();
  entries.forEach(([username, submission]) => {
    if (submission && typeof submission === "object") {
      cards.appendChild(createClassmateCard(username, submission));
    }
  });
  classmateList.appendChild(cards);

  const profileCount = classmateList.childElementCount;
  classmateStatus.textContent = profileCount === 1
    ? "1 classmate introduction loaded."
    : `${profileCount} classmate introductions loaded, newest first.`;
}

loadClassmateIntroductions();
