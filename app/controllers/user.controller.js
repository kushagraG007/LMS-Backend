const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.changeUsername = async (req, res) => {
  try {
    const { userId, newUsername } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Check if the user already has a username
    if (user.username) {
      return res
        .status(400)
        .send({ message: "Username has already been set." });
    }

    // Check if the new username is already taken by another user
    const usernameExists = await User.findOne({ username: newUsername });

    if (usernameExists) {
      return res.status(400).send({ message: "Username is already taken." });
    }

    // Update the username only if it's not set and not already taken
    user.username = newUsername;

    // Save the updated user
    await user.save();

    res.status(200).send({ message: "Username updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.updatePersonalInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    const { firstName, lastName, dateOfBirth, city, contactNumber } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Update the user's personal information
    user.firstName = firstName;
    user.lastName = lastName;
    user.dateOfBirth = dateOfBirth;
    user.city = city;
    user.contactNumber = contactNumber;

    // Save the updated user
    await user.save();

    res
      .status(200)
      .send({ message: "Personal information updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.getPersonalInfo = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Return the user's personal information
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      city: user.city,
      contactNumber: user.contactNumber,
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
