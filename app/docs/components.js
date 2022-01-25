module.exports = {
	components: {
		schemas: {
			Signin: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: {
						type: "string",
						description: "The email of the customer",
						required: true,
						example: "jemoustique@gmail.com",
					},
					password: {
						type: "string",
						description: "The password of the customer",
						required: true,
						example: "jeanbon69",
					},
				},
				example: {
					email: "jemoustique@gmail.com",
					password: "jeanbon",
				},
			},
			Token: {
				type: "object",
				required: ["access_token", "refresh_token"],
				properties: {
					access_token: {
						type: "string",
						description: "Authentication: access_token",
						required: true,
						example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzAzMDcyMSwiZXhwIjoxNjQzMDMwNzUxfQ.-_F14vPYc5mXDPNgpYiwsVo_LeaZTEw93zc05goBIiw",
					},
					refresh_token: {
						type: "string",
						description: "Authentication: refresh_token",
						required: true,
						example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzEwMDYxMCwiZXhwIjoxNjQzMTA0MjEwfQ.5aU00qsTYoZaHwPWRaAytj36PfxqBNsYMPSugxxaCZw",
					},
				},
				example: {
					access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzAzMDcyMSwiZXhwIjoxNjQzMDMwNzUxfQ.-_F14vPYc5mXDPNgpYiwsVo_LeaZTEw93zc05goBIiw",
					refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzEwMDYxMCwiZXhwIjoxNjQzMTA0MjEwfQ.5aU00qsTYoZaHwPWRaAytj36PfxqBNsYMPSugxxaCZw",
				},
			},
			AccessToken: {
				type: "object",
				required: ["access_token", "refresh_token"],
				properties: {
					access_token: {
						type: "string",
						description: "Authentication: access_token",
						required: true,
						example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzAzMDcyMSwiZXhwIjoxNjQzMDMwNzUxfQ.-_F14vPYc5mXDPNgpYiwsVo_LeaZTEw93zc05goBIiw",
					},
				},
				example: {
					access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzAzMDcyMSwiZXhwIjoxNjQzMDMwNzUxfQ.-_F14vPYc5mXDPNgpYiwsVo_LeaZTEw93zc05goBIiw",
				},
			},
			RefreshToken: {
				type: "object",
				required: ["access_token", "refresh_token"],
				properties: {
					refresh_token: {
						type: "string",
						description: "Authentication: refresh_token",
						required: true,
						example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzEwMDYxMCwiZXhwIjoxNjQzMTA0MjEwfQ.5aU00qsTYoZaHwPWRaAytj36PfxqBNsYMPSugxxaCZw",
					},
				},
				example: {
					refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzEwMDYxMCwiZXhwIjoxNjQzMTA0MjEwfQ.5aU00qsTYoZaHwPWRaAytj36PfxqBNsYMPSugxxaCZw",
				},
			},
			Customer: {
				type: "object",
				required: ["email", "firstname", "lastname", "phone_number"],
				properties: {
					id: {
						type: "integer",
						description: "The auto-generated id",
						example: 1,
					},
					email: {
						type: "string",
						description: "The email of the customer",
						required: true,
						example: "jemoustique@gmail.com",
					},
					firstname: {
						type: "string",
						description: "The firstname of the customer",
						required: true,
						example: "Jules-Edouard",
					},
					lastname: {
						type: "string",
						description: "The lastname of the customer",
						required: true,
						example: "Moustique",
					},
					phone_number: {
						type: "string",
						format: "Phone number",
						required: true,
						description: "The phone number of the customer",
						example: "0175492412",
					},
					avatar: {
						type: "string",
						description: "The photo of the customer",
						example: "/link/photo52",
					},
					isAdmin: {
						type: "boolean",
						description: "Boolean that gives admin access",
						example: false,
					}
				},
				example: {
					id: 5,
					email: "jemoustique@gmail.com",
					firstname: "Jules-Edouard",
					lastname: "Moustique",
					phone_number: "0175492412",
					photo: "/link/photo54",
					isAdmin: false,
				},
			},
			House: {
				type: "object",
				required: [
					"adress",
					"zip_code",
					"city",
					"country",
					"type",
					"latutide",
					"longitude",
					"map",
					"customer_id",
				],
				properties: {
					id: {
						type: "integer",
						description: "The auto-generated id of the list",
						example: 4,
					},
					address: {
						type: "string",
						description: "The address of the house associated.",
						required: true,
						example: "5 rue des petits pas",
					},
					zip_code: {
						type: "string",
						description: "The zip code of the house",
						required: true,
						example: "75015",
					},
					city: {
						type: "string",
						description: "The city of the house",
						required: true,
						example: "Troyes",
					},
					country: {
						type: "integer",
						description: "The country of the house",
						required: true,
						example: 76,
					},
					type: {
						type: "integer",
						description: "The type of the house",
						required: true,
						example: 5,
					},
					title: {
						type: "string",
						description: "The title of the house",
						example: "Maison bleu",
					},
					nb_rooms: {
						type: "integer",
						description: "The nb_rooms of the house",
						example: 5,
					},
					nb_bedrooms: {
						type: "integer",
						description: "The nb_bedrooms of the house",
						example: 2,
					},
					surface: {
						type: "integer",
						description: "The surface of the house",
						example: 187,
					},
					area: {
						type: "integer",
						description: "The area of the house",
						example: 42,
					},
					floor: {
						type: "integer",
						description: "The floor of the house",
						example: 5,
					},
					description: {
						type: "string",
						description: "The description of the house",
						example: "lorem blablablablablablablaaaaaaaaa !!!",
					},
					latitude: {
						type: "string",
						description: "The latitude of the house",
						required: true,
						example: "48.099071531610875",
					},
					longitude: {
						type: "string",
						description: "The longitude of the house",
						required: true,
						example: "-0.748887016329141",
					},
					map: {
						type: "string",
						description: "The map of the house",
						required: true,
						example:
							"https://maps.google.com/maps?q=48.099071531610875,-0.7488870163291419",
					},
					customer_id: {
						type: "integer",
						description: "The id of the customer the animal belongs to",
						required: true,
						example: 22,
					},
					internet: {
						type: "boolean",
						description: "The internet of the house",
						required: true,
						example: true,
					},
					washing_machine: {
						type: "boolean",
						description: "The washing_machine of the house",
						required: true,
						example: true,
					},
					tv: {
						type: "boolean",
						description: "The tv of the house",
						required: true,
						example: true,
					},
					hoven: {
						type: "boolean",
						description: "The hoven of the house",
						required: true,
						example: true,
					},
					microwave: {
						type: "boolean",
						description: "The microwave of the house",
						required: true,
						example: true,
					},
					dishwasher: {
						type: "boolean",
						description: "The dishwasher of the house",
						required: true,
						example: true,
					},
					washing_machine: {
						type: "boolean",
						description: "The washing_machine of the house",
						required: true,
						example: true,
					},
					bathtub: {
						type: "boolean",
						description: "The bathtub of the house",
						required: true,
						example: true,
					},
					shower: {
						type: "boolean",
						description: "The shower of the house",
						required: true,
						example: true,
					},
					parking: {
						type: "boolean",
						description: "The parking of the house",
						required: true,
						example: true,
					},
					created_at: {
						type: "timestamptz",
						description: "The created_at of the house",
						example: "2022-03-10 00:00:00+00",
					},
					updated_at: {
						type: "timestamptz",
						description: "The updated_at of the house",
						example: "2022-03-10 00:00:00+00",
					},
					validation: {
						type: "boolean",
						description: "The validation of the house",
						example: true,
					},
				},
				example: {
					id: 2,
					adress: "19 rue du boulet",
					zip_code: "75 010 CEDEX",
					city: "Montcuq",
					country: 76,
					type: 5,
					title: "Maison bleu",
					nb_rooms: 2,
					nb_bedrooms: 4,
					surface: 187,
					area: 666,
					floor: 3,
					description:
						"C'est une maison bleue Adossée à la colline On y vient à pied, on ne frappe pas Ceux qui vivent là, ont jeté la clé",
					latitude: "48.099071531610875",
					longitude: "-0.748887016329141",
					map: "https://maps.google.com/maps?q=48.099071531610875,-0.7488870163291419",
					internet: true,
					washing_machine: true,
					tv: false,
					hoven: true,
					microwave: true,
					dishwasher: true,
					bathtub: true,
					shower: true,
					parking: false,
					created_at: "2022-03-10 00:00:00+00",
					updated_at: "2022-03-10 00:00:00+00",
					validation: true,
					customer_id: 22,
				},
			},

			Animal: {
				type: "object",
				required: ["type", "customer_id"],
				properties: {
					id: {
						type: "integer",
						description: "The auto-generated id",
						example: 1,
					},
					type: {
						type: "string",
						description: "The type of animal",
						required: true,
						example: "cat",
					},
					race: {
						type: "string",
						description: "The race of the animal",
						example: "main coon",
					},
					diseases: {
						type: "string",
						description: "The diseases of the animal",
						example: "Renal failure",
					},
					notes: {
						type: "string",
						description: "The diseases of the animal",
						example: "Garfield is very cute, large and very very cuddly",
					},
					photo: {
						type: "string",
						description: "The photo of the animal",
						example: "/link/photo45",
					},
					validation: {
						type: "boolean",
						description: "The validation of the animal",
						example: false,
					},
					customer_id: {
						type: "integer",
						description: "The id of the customer the animal belongs to",
						required: true,
						example: 22,
					},
				},
				example: {
					id: 5,
					type: "cat",
					race: "Turc Van",
					diseases: "Renal failure",
					notes: "Garfield is very cute, large and very very cuddly",
					photo: "/link/photo85",
					validation: true,
					customer_id: 22,
				},
			},
			Plant: {
				type: "object",
				required: ["type", "customer_id"],
				properties: {
					id: {
						type: "integer",
						description: "The auto-generated id",
						example: 1,
					},
					type: {
						type: "string",
						description: "The type of plant",
						required: true,
						example: "Rose",
					},
					notes: {
						type: "string",
						description: "The notes of plant",
						example: "Water 3 by day",
					},
					photo: {
						type: "string",
						description: "The photo of plant",
						example: "/link/photo87",
					},
					validation: {
						type: "boolean",
						description: "The validation of the plant",
						example: false,
					},
				},
				example: {
					id: 5,
					type: "Rose",
					notes: "Water 3 by day",
					photo: "/link/photo32",
					validation: true,
					customer_id: 22,
				},
			},
			Absentee: {
				type: "object",
				required: ["starting_date", "ending_date", "customer_id"],
				properties: {
					id: {
						type: "integer",
						description: "The auto-generated id",
						example: 1,
					},
					starting_date: {
						type: "timestamptz",
						description: "The starting_date of the absentee",
						required: true,
						example: "2022-03-10 00:00:00+00",
					},
					ending_date: {
						type: "timestamptz",
						description: "The ending_date of the absentee",
						required: true,
						example: "2023-12-08 00:00:00+00",
					},
					customer_id: {
						type: "integer",
						description: "The id of the customer the animal belongs to",
						required: true,
						example: 22,
					},
				},
				example: {
					id: 5,
					starting_date: "2022-03-10 00:00:00+00",
					ending_date: "2023-12-08 00:00:00+00",
					customer_id: 22,
				},
			},
			Type: {
				type: "object",
				required: [],
				properties: {
					id: {
						type: "integer",
						description: "The auto-generated id",
						example: 1,
					},
					type: {
						type: "string",
						description: "The type of house",
						required: true,
						example: "Maison",
					},
				},
				example: {
					id: 5,
					type: "Loft",
				},
			},
			Photo: {
				type: "object",
				required: ["photo", "house_id"],
				properties: {
					id: {
						type: "integer",
						description: "The auto-generated id",
						example: 1,
					},
					photo: {
						type: "string",
						description: "The photo of the photo",
						required: true,
						example: "/link/photo22",
					},
					validation: {
						type: "boolean",
						description: "The validation of the photo",
						example: false,
					},
					customer_id: {
						type: "integer",
						description: "The id of the house it belongs to",
						required: true,
						example: 22,
					},
				},
				example: {
					id: 5,
					photo: "/link/photo33",
					validation: false,
					customer_id: 22,
				},
			},
			Country: {
				type: "object",
				required: [],
				properties: {
					id: {
						type: "integer",
						description: "The auto-generated id",
						example: 1,
					},
					country: {
						type: "string",
						description: "The name of the country",
						required: true,
						example: "France",
					},
				},
				example: {
					id: 5,
					country: "France",
				},
			},
		},
	},
};
