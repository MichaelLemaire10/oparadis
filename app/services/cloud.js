const { cloud_name, api_key, api_secret } = require("../config");
const cloudinary = require("cloudinary");
cloudinary.config({ cloud_name, api_key, api_secret });

module.exports = {
	cloudCreatePhoto: async (data) => {
		// receives an image in base 64 and transforms it into an image with the method cloudinary.image
		cloudinary.image(data);
		// The image is sent to cloudinary and an object with several properties is retrieved
		const result = await cloudinary.uploader.upload(data);
		// retrieves the url and use split/splice/map/joints to add a format to the photo
		result.url = result.secure_url
			// split : delete a string pass as a parameter with split we recorver a array
			.split("https://res.cloudinary.com/oparadis/image/upload/")
			// splice : allows to place an element in an array or to replace an element splice takes 3 parameters
			// 2 number (first number selected l'index and second number 1=replace && 0=place)
			// and 1 element to place in the array. Here the 3rd parameter is map
			.splice(1, 1)
			.map(
				(x) =>
					`https://res.cloudinary.com/oparadis/image/upload/c_scale,w_800/${x}`
			)
			// creates and returns a new string by concatenating all elements of an array
			//	Concatenation uses the comma or another string, supplied as an argument, as a separator.
			.join();
		return result.url;
	},
	cloudCreateAvatar: async (data) => {
		cloudinary.image(data);
		const result = await cloudinary.uploader.upload(data);
		result.url = result.secure_url
			.split(`https://res.cloudinary.com/${cloud_name}/image/upload/`)
			.splice(1, 1)
			.map(
				(x) =>
					`https://res.cloudinary.com/${cloud_name}/image/upload/w_200,h_200,c_fill,g_face,r_max/${x}`
			)
			.join();
		return result.url;
	},
	cloudDelete: async (data) => {
		//? split allows to retrieve the key in url to delete an image on cloudinary the key is required
		const key = data.split("/")[data.split("/").length - 1].split(".")[0];
		//? Method destroy allow delete a image with the key
		await cloudinary.uploader.destroy(key);
		return;
	},
};
