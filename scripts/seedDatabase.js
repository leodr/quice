const admin = require("firebase-admin");
const faker = require("faker");
require("dotenv").config({ path: ".env.local" });
const { prompt } = require("enquirer");
const { subMonths } = require("date-fns");

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.FIREBASE_PROJECT_ID,
		privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	}),
});

const firestore = admin.firestore();

async function seed() {
	const { testUserId } = await prompt({
		type: "input",
		name: "testUserId",
		message: "Enter the ID of the test user",
	});

	const forms = [
		{
			name: "Sales Contact",
			color: "orange",
			owner: { type: "user", id: testUserId },
		},
		{
			name: "Feedback (On-Site)",
			color: "green",
			owner: { type: "user", id: testUserId },
		},
		{
			name: "General Contact",
			color: "indigo",
			owner: { type: "user", id: testUserId },
		},
		{
			name: "Personal Get in Touch",
			color: "pink",
			owner: { type: "user", id: testUserId },
		},
	];

	const formBatch = firestore.batch();

	const formCollection = firestore.collection("forms");

	const formsWithIds = forms.map((form) => {
		const newFormRef = formCollection.doc();

		formBatch.set(newFormRef, form);

		return { ...form, id: newFormRef.id };
	});

	await formBatch.commit();
	console.log("Successfully wrote form batch.");

	const submissionCollection = firestore.collection("submissions");

	const today = new Date();

	/**
	 * Sales Form, https://vercel.com/contact/sales
	 */
	const salesForm = formsWithIds.find((form) => form.color === "orange");

	const salesBatch = firestore.batch();

	const firstSalesSubmission = subMonths(today, 3);

	for (let i = 0; i < 200; i++) {
		const submissionDate = getRandomDateInRange(firstSalesSubmission, today);

		const submission = {
			createdAt: admin.firestore.Timestamp.fromDate(submissionDate),
			formId: salesForm.id,
			readAt: null,
			data: {
				email: faker.internet.email(),
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
				companyWebsite: faker.internet.url(),
				companySize: faker.random.number(100),
				productsOfInterest: [
					maybe() && "Vercel",
					maybe() && "Preview Deployments",
					maybe() && "Next.js",
					maybe() && "Built in free SSL",
					maybe() && "Edge Network",
					maybe() && "Integrations",
					maybe() && "Git Solutions",
					maybe() && "Analytics / RES",
				].filter(Boolean),
				howCanWeHelpYou: faker.lorem.sentences(),
			},
		};

		const newSubmissionRef = submissionCollection.doc();

		salesBatch.set(newSubmissionRef, submission);
	}

	await salesBatch.commit();
	console.log("Successfully wrote sales batch.");

	/**
	 * Feedback Form
	 * https://vercel.com/dashboard
	 */
	const feedbackForm = formsWithIds.find((form) => form.color === "green");

	const feedbackBatch = firestore.batch();

	const firstFeedbackSubmission = subMonths(today, 1);

	for (let i = 0; i < 300; i++) {
		const submissionDate = getRandomDateInRange(firstFeedbackSubmission, today);

		const submission = {
			createdAt: admin.firestore.Timestamp.fromDate(submissionDate),
			formId: feedbackForm.id,
			readAt: null,
			data: {
				feedback: faker.lorem.sentences(),
			},
		};

		const newSubmissionRef = submissionCollection.doc();

		feedbackBatch.set(newSubmissionRef, submission);
	}

	await feedbackBatch.commit();
	console.log("Successfully wrote feedback batch.");

	/**
	 * Contact Form
	 * https://labs.tobit.com/Kontakt
	 */
	const contactForm = formsWithIds.find((form) => form.color === "indigo");

	const contactBatch = firestore.batch();

	const firstContactSubmission = subMonths(today, 12);

	for (let i = 0; i < 120; i++) {
		const submissionDate = getRandomDateInRange(firstContactSubmission, today);

		const submission = {
			createdAt: admin.firestore.Timestamp.fromDate(submissionDate),
			formId: contactForm.id,
			readAt: null,
			data: {
				email: faker.internet.email(),
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
				companyWebsite: faker.internet.url(),
				companySize: faker.random.number(100),
				productsOfInterest: {
					"Ich möchte mehr über das Digitalkonzept der Showcases erfahren": maybe(),
					"Ich würde gerne die Labs besuchen": maybe(),
					"Ich möchte die Digitalstadt Ahaus besichtigen": maybe(),
					"Mich interessiert eine Kooperation": maybe(),
					"Ich habe eine Frage zu Produkten": maybe(),
					"Ich möchte den Campus für ein Event nutzen": maybe(),
					"Ich möchte Feedback geben": maybe(),
					"Ich habe eine Frage": maybe(),
				},
				additional: maybe() ? faker.lorem.sentence() : "",
				contact: maybe() ? faker.internet.email() : faker.phone.phoneNumber(),
			},
		};

		const newSubmissionRef = submissionCollection.doc();

		contactBatch.set(newSubmissionRef, submission);
	}

	await contactBatch.commit();
	console.log("Successfully wrote contact batch.");

	/**
	 * Personal Form
	 */
	const personalForm = formsWithIds.find((form) => form.color === "pink");

	const personalBatch = firestore.batch();

	const firstPersonalSubmission = subMonths(today, 5);

	for (let i = 0; i < 300; i++) {
		const submissionDate = getRandomDateInRange(firstPersonalSubmission, today);

		const submission = {
			createdAt: admin.firestore.Timestamp.fromDate(submissionDate),
			formId: personalForm.id,
			readAt: null,
			data: {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				company: faker.company.companyName(),
				email: faker.internet.email(),
				phoneNumber: faker.phone.phoneNumber(),
				message: maybe() ? faker.lorem.sentences() : null,
				agreed: true,
			},
		};

		const newSubmissionRef = submissionCollection.doc();

		personalBatch.set(newSubmissionRef, submission);
	}

	await personalBatch.commit();
	console.log("Successfully wrote personal batch.");
}

seed();

function getRandomDateInRange(from, to) {
	const fromTime = from.getTime();
	const toTime = to.getTime();

	return new Date(fromTime + Math.random() * (toTime - fromTime));
}

function maybe() {
	return Math.random() > 0.5;
}
