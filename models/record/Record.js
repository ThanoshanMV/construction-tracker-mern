/**
 * To create a model we need to create schema which
 * holds different fields for this particular resource to have
 */
const mongoose = require('mongoose');

// Mongoose quickstart: https://mongoosejs.com/docs/index.html (Must read)
// Schema guide: https://mongoosejs.com/docs/guide.html

const RecordSchema = new mongoose.Schema({
  /**
   * Stage 1
   */
  referenceNumber: {
    type: String,
    required: true,
  },
  dateOfApplicationRequested: {
    type: Date,
  },
  purpose: {
    type: String,
  },
  stage1Comments: {
    type: String,
  },
  applicantAddress: {
    type: String,
  },
  constructionAddress: {
    type: String,
  },
  contactNo: {
    type: Number,
  },
  payment: {
    type: Number,
  },

  /**
   * Stage 2
   */

  dateOfApplicationSubmitted: {
    type: Date,
  },
  relatedDocumentsSubmitted: {
    type: String,
  },
  nbroRecommentationReport: {
    type: String,
  },
  stage2Comments: {
    type: String,
  },

  /**
   * Stage 3
   */
  technicalRecommendation: {
    type: String,
  },
  stage3Comments: {
    type: String,
  },

  /**
   * Stage 4
   */
  phiRecommendation: {
    type: String,
  },
  stage4Comments: {
    type: String,
  },

  /**
   * Stage 5
   */
  rdaRecommendation: {
    type: String,
  },
  stage5Comments: {
    type: String,
  },

  /**
   * Stage 6
   */
  dateOfApplicationForwardedToPlanningCommittee: {
    type: Date,
  },
  planningCommitteeDecision: {
    type: String,
  },
  stage6Comments: {
    type: String,
  },
  dateOfPlanningCommitteeDecision: {
    type: Date,
  },

  /**
   * Stage 7
   */
  statusOfTheApplication: {
    type: String,
  },
  dateOfDecisionGivenToApplicant: {
    type: Date,
  },
  stage7Comments: {
    type: String,
  },
});

const Record = mongoose.model('record', RecordSchema);
module.exports = Record;
