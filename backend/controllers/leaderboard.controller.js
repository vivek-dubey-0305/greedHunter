// import User from "../models/user.model.js";
// import Event from "../models/event.model.js";

import { User } from "../models/user.model.js";

/**
 * 🏆 Get User's Overall Ranking
 */
export const getOverallRanking = async (req, res) => {
  try {
    // Fetch all users and calculate total marks
    const users = await User.find({}, "fullName enrollmentNumber enrolledEvents");
    
    const rankedUsers = users.map(user => {
      const totalMarks = Object.values(user.enrolledEvents || {}).reduce((acc, category) => {
        return acc + Object.values(category).reduce((subAcc, subcategory) => {
          return subAcc + subcategory.reduce((marksSum, event) => marksSum + (event.marks || 0), 0);
        }, 0);
      }, 0);
      return { ...user._doc, totalMarks };
    });

    // Sort users by total marks (descending)
    rankedUsers.sort((a, b) => b.totalMarks - a.totalMarks);

    // Find current user's rank
    const userRank = rankedUsers.findIndex(user => user._id.toString() === req.user.id) + 1;

    res.status(200).json({
      success: true,
      rank: userRank,
      totalPlayers: rankedUsers.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching overall ranking", error });
  }
};

/**
 * 🎯 Get User's Rank in a Specific Category
 */
export const getCategoryRanking = async (req, res) => {
  try {
    const { category } = req.params;
    const users = await User.find({}, "fullName enrollmentNumber enrolledEvents");

    const rankedUsers = users.map(user => {
      const categoryMarks = Object.values(user.enrolledEvents?.[category] || {}).reduce((acc, subcategory) => {
        return acc + subcategory.reduce((marksSum, event) => marksSum + (event.marks || 0), 0);
      }, 0);
      return { ...user._doc, categoryMarks };
    });

    rankedUsers.sort((a, b) => b.categoryMarks - a.categoryMarks);

    const userRank = rankedUsers.findIndex(user => user._id.toString() === req.user.id) + 1;

    res.status(200).json({
      success: true,
      category,
      rank: userRank,
      totalPlayers: rankedUsers.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching category ranking", error });
  }
};

/**
 * 🤖 Get User's Rank in a Specific Subcategory
 */
export const getSubcategoryRanking = async (req, res) => {
  try {
    const { category, subcategory } = req.params;
    const users = await User.find({}, "fullName enrollmentNumber enrolledEvents");

    const rankedUsers = users.map(user => {
      const subcategoryMarks = (user.enrolledEvents?.[category]?.[subcategory] || []).reduce(
        (sum, event) => sum + (event.marks || 0),
        0
      );
      return { ...user._doc, subcategoryMarks };
    });

    rankedUsers.sort((a, b) => b.subcategoryMarks - a.subcategoryMarks);

    const userRank = rankedUsers.findIndex(user => user._id.toString() === req.user.id) + 1;

    res.status(200).json({
      success: true,
      category,
      subcategory,
      rank: userRank,
      totalPlayers: rankedUsers.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching subcategory ranking", error });
  }
};

/**
 * ⚔️ Head-to-Head Comparison
 */
export const getHeadToHeadComparison = async (req, res) => {
  try {
    const { opponentId } = req.params;
    const user = await User.findById(req.user.id, "fullName enrolledEvents");
    const opponent = await User.findById(opponentId, "fullName enrolledEvents");

    if (!opponent) {
      return res.status(404).json({ success: false, message: "Opponent not found" });
    }

    let userWins = 0;
    let opponentWins = 0;
    let matchesPlayed = 0;

    Object.keys(user.enrolledEvents || {}).forEach(category => {
      Object.keys(user.enrolledEvents[category] || {}).forEach(subcategory => {
        user.enrolledEvents[category][subcategory].forEach(event => {
          const opponentEvent = opponent.enrolledEvents?.[category]?.[subcategory]?.find(
            evt => evt.eventId.toString() === event.eventId.toString()
          );
          if (opponentEvent) {
            matchesPlayed++;
            if (event.marks > (opponentEvent.marks || 0)) {
              userWins++;
            } else if (event.marks < (opponentEvent.marks || 0)) {
              opponentWins++;
            }
          }
        });
      });
    });

    res.status(200).json({
      success: true,
      message: `You have beaten @${opponent.fullName} ${userWins} times!`,
      userWins,
      opponentWins,
      matchesPlayed
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching head-to-head comparison", error });
  }
};

/**
 * 📜 Get History of Enrolled Events
 */
export const getEnrolledEventHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "fullName enrolledEvents").populate({
      path: "enrolledEvents",
      populate: { path: "eventId", model: "Event" }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let history = [];

    Object.keys(user.enrolledEvents || {}).forEach(category => {
      Object.keys(user.enrolledEvents[category] || {}).forEach(subcategory => {
        user.enrolledEvents[category][subcategory].forEach(event => {
          history.push({
            category,
            subcategory,
            title: event.eventId.title,
            marks: event.marks,
            startTime: event.eventId.startTime,
            endTime: event.eventId.endTime,
            isPlayed: event.isPlayed
          });
        });
      });
    });

    res.status(200).json({
      success: true,
      history
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching event history", error });
  }
};
