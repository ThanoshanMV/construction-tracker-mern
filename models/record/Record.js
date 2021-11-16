/**
 * To create a model we need to create schema which
 * holds different fields for this particular resource to have
 */
const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  /**
   * Stage 1
   */
  stage1: {
    referenceNumber: {
      type: String,
      required: true,
    },
    dateOfApplicationRequested: Date,
    purpose: String,
    stage1Comments: String,
    applicantAddress: String,
    constructionAddress: String,
    contactNo: Number,
    payment: Number
  },

  /**
   * Stage 2
   */
  stage2: {
    dateOfApplicationSubmitted: Date,
    relatedDocumentsSubmitted: String,
    nbroRecommentationReport: String,
    stage2Comments: String
  },

  /**
   * Stage 3
   */
  stage3: {
    technicalRecommendation: String,
    stage3Comments: String,
  },

  /**
   * Stage 4
   */
  stage4: {
    phiRecommendation: String,
    stage4Comments: String
  },

  /**
   * Stage 5
   */
  stage5: {
    rdaRecommendation: String,
    stage5Comments: String,
  },

  /**
   * Stage 6
   */
  stage6: {
    dateOfApplicationForwardedToPlanningCommittee: Date,
    planningCommitteeDecision: String,
    stage6Comments: String,
    dateOfPlanningCommitteeDecision: Date,
  },

  /**
   * Stage 7
   */
  stage7: {
    statusOfTheApplication: String,
    dateOfDecisionGivenToApplicant: Date,
    stage7Comments: String,
  }
});

const Record = mongoose.model('record', RecordSchema);
module.exports = Record;
