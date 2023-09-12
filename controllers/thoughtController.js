const { Thought, User } = require('../models');

module.exports = {
  //function to get all of the applications by invoking the find() method with no args
  // then we return the results as JSON, and catch any errors. errors are sent as json with a message and a 500 status
  async getApplications(req, res) {
    try {
      const applications = await Application.find();
      res.json(applications);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// gets a single applicatoin using the findOneAndUpdate method. we pass in the ID of the appication and then
// respond with it, or an error if not found
  async getSingleApplication(req, res) {
    try {
      const application = await Application.findOne({ _id: req.params.applicationId });

      if (!application) {
        return res.status(404).json({ message: 'No application with that ID' });
      }

      res.json(application);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the createApplication method
  // creates a new applictaoin. accepts arequest body with the entire applicatoin object
  // bc applications are associated with users, we then update the user who created the app and add the DI
  // of the application to the app
  async createApplication(req, res) {
    try {
      const application = await Application.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { applications: application._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Application created, but found no user with that ID',
        })
      }

      res.json('Created the application 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the updateApplication method
  // deletes an app from the db
  async updateApplication(req, res) {
    try {
      const application = await Application.findOneAndUpdate(
        { _id: req.params.applicationId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!application) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      res.json(application);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the deleteApplication method
  // 
  async deleteApplication(req, res) {
    try {
      const application = await Application.findOneAndRemove({ _id: req.params.applicationId });

      if (!application) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { applications: req.params.applicationId },
        { $pull: { applications: req.params.applicationId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Application created but no user with this id!',
        });
      }

      res.json({ message: 'Application successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the addTag method
  async addTag(req, res) {
    try {
      const application = await Application.findOneAndUpdate(
        { _id: req.params.applicationId },
        { $addToSet: { tags: req.body } },
        { runValidators: true, new: true }
      );

      if (!application) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      res.json(application);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the addTag method
  async removeTag(req, res) {
    try {
      const application = await Application.findOneAndUpdate(
        { _id: req.params.applicationId },
        { $pull: { tags: { tagId: req.params.tagId } } },
        { runValidators: true, new: true }
      );

      if (!application) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      res.json(application);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
