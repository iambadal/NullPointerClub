import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, startTime, endTime } = req.body;

    const organizerId = req.user.id;

    if (!title || !description || !startTime || !endTime) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const event = await Event.create({
      title,
      description,
      startTime,
      endTime,
      organizer: organizerId
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};