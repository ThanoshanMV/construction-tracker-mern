import React, { Fragment, useState } from 'react';
// to use history object, we use withRouter
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAdminRecord, updateAdminRecord } from '../../actions/record';
import { useForm } from "react-hook-form";

const AdminCreateRecord = ({
  createAdminRecord,
  updateAdminRecord,
  history,
}) => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => {
    // console.log(data);
    createAdminRecord(data, history);
  };
  return (
    <section className='container'>
    <Fragment>
      <h1 className='large text-primary'>
        Construction Approval Records <i className='fas fa-rocket'></i>
      </h1>

      <h2 className='large text-secondary'>Hatton-Dickoya Urban Council</h2>

      {/*stage 1 starts*/}

      <h3 className='lead text-secondary'>Stage 1: Request for Application</h3>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label className='lead' htmlFor='referenceNumber'>
            Reference Number
          </label>
          <input
            type='text'
            placeholder='HDUC2020C001'
          {...register("referenceNumber", {required: true}, { pattern: /^(HDUC2020C)$/ })}
          />
          {errors.referenceNumber && <p style = {{color: 'red'}}>must begin with HDUC2020C</p>}
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='dateOfApplicationRequested'>
            Date Requested for Application
          </label>
          <input
            type='date'
            {...register("dateOfApplicationRequested")}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='purpose'>
            Purpose of the Application
          </label>
          <select {...register("purpose")}>
            <option value='0'>Application Purpose</option>
            <option value='Residence'>Residence</option>
            <option value='Commercial'>Commercial</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage1Comments'>
            Comments
          </label>
          <textarea
            {...register("stage1Comments")}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='applicantAddress'>
            Address of Applicant
          </label>
          <textarea
            {...register("applicantAddress")}
            cols='30'
            rows='5'
            placeholder='Address'
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='constructionAddress'>
            Address of the Contruction Site
          </label>
          <textarea
            {...register("constructionAddress")}
            cols='30'
            rows='5'
            placeholder='Construction Site'
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='contactNo'>
            Contact No.
          </label>
          <input
            type='number'
            placeholder='07xxxxxxxx'
            {...register("contactNo", {required: true, minLength: 9, maxLength: 10})}
          />
          {errors.contactNo && <p style = {{color: 'red'}}>Please check the contact number</p>}
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='payment'>
            Amount for the payment of Application
          </label>
          <input
            type='number'
            placeholder='Amount'
            {...register("payment", {required: true})}
          />
          {errors.payment && <p style = {{color: 'red'}}>Please check the payment</p>}
          {/* <input type='submit' value='Save' className='btn btn-primary my-1' /> */}
        </div>

        {/*stage 1 ends*/}

        {/*stage 2 starts*/}

        <h3 className='my-2 lead text-secondary'>
          Stage 2: Submission of Application Stage
        </h3>
        <div className='form-group'>
          <label className='lead' htmlFor='dateOfApplicationSubmitted'>
            Date of Application Submitted
          </label>
          <input
            type='date'
            {...register("dateOfApplicationSubmitted")}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='relatedDocumentsSubmitted'>
            Related Documents Submitted
          </label>
          <select
            {...register("relatedDocumentsSubmitted")}
          >
            <option value='0'>* Related Documents Submitted</option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='nbroRecommentationReport'>
            NBRO Recommentation Report
          </label>
          <select
            {...register("nbroRecommentationReport")}
          >
            <option value='0'>* NBRO Recommentation Report</option>
            <option value='Recommended'>Recommended</option>
            <option value='NotRecommended'>Not Recommended</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage2Comments'>
            Comments
          </label>
          <textarea
            {...register("stage2Comments")}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
          {/* <input type='submit' value='Save' className='btn btn-primary my-1' /> */}
        </div>

        {/*stage 2  ends*/}

        {/*stage 3 starts*/}

        <h3 className='my-2 lead text-secondary'>Stage 3: Technical Aspects</h3>

        <div className='form-group'>
          <label className='lead' htmlFor='technicalRecommendation'>
            Technical Recommendation by the Technical Officier
          </label>
          <select
            {...register("technicalRecommendation")}
          >
            <option value='0'>* Technical Recommendation</option>
            <option value='Recommended'>Recommended</option>
            <option value='NotRecommended'>Not Recommended</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage3Comments'>
            Comments
          </label>
          <textarea
            {...register("stage3Comments")}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
          {/* <input type='submit' value='Save' className='btn btn-primary my-1' /> */}
        </div>

        {/*stage 3 ends*/}

        {/*stage 4 starts*/}

        <h3 className='my-2 lead text-secondary'>Stage 4: Health Aspects</h3>

        <div className='form-group'>
          <label className='lead' htmlFor='phiRecommendation'>
            Health Recommendation by the Public Health Inspector
          </label>
          <select
            {...register("phiRecommendation")}
          >
            <option value='0'>* Health Recommendation</option>
            <option value='Recommended'>Recommended</option>
            <option value='NotRecommended'>Not Recommended</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage4Comments'>
            Comments
          </label>
          <textarea
            {...register("stage4Comments")}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
          {/* <input type='submit' value='Save' className='btn btn-primary my-1' /> */}
        </div>

        {/*stage 4 ends*/}

        {/*stage 5 starts*/}

        <h3 className='my-2 lead text-secondary'>Stage 5: RDA/ PRDA Aspects</h3>

        <div className='form-group'>
          <label className='lead' htmlFor='rdaRecommendation'>
            RDA/ PRDA Recommendation (If needed)
          </label>
          <select
            {...register("rdaRecommendation")}
          >
            <option value='0'>* RDA/ PRDA Recommendation</option>
            <option value='Nill'>Nill</option>
            <option value='RecommendedNBRO'>Recommended</option>
            <option value='NotRecommendedNBRO'>Not Recommended</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage5Comments'>
            Comments
          </label>
          <textarea
            {...register("stage5Comments")}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
          {/* <input type='submit' value='Save' className='btn btn-primary my-1' /> */}
        </div>

        {/*stage 5 ends*/}

        {/*stage 6 starts*/}

        <h3 className='my-2 lead text-secondary'>
          Stage 6: Planning Committee Aspects
        </h3>

        <div className='form-group'>
          <label
            className='lead'
            htmlFor='dateOfApplicationForwardedToPlanningCommittee'
          >
            Forwarded the Application to the Planning Committee on
          </label>
          <input
            type='date'
            {...register("dateOfApplicationForwardedToPlanningCommittee")}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='planningCommitteeDecision'>
            Planning Committee Decision
          </label>
          <select
            {...register("planningCommitteeDecision")}
          >
            <option value='0'>* Planning Committee Recommendation</option>
            <option value='Approved'>Approved</option>
            <option value='Rejected'>Rejected</option>
            <option value='CorrectionsForApproval'>
              Corrections for Approval
            </option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage6Comments'>
            {' '}
            Comments
          </label>
          <textarea
            {...register("stage6Comments")}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='dateOfPlanningCommitteeDecision'>
            Date of Planning Committee Decision
          </label>
          <input
            type='date'
            {...register("dateOfPlanningCommitteeDecision")}
          />
          {/* <input type='submit' value='Save' className='btn btn-primary my-1' /> */}
        </div>

        {/*stage 6 ends*/}

        {/*stage 7 starts*/}

        <h3 className='my-2 lead text-secondary'>
          Stage 7: Status of the Application
        </h3>

        <div className='form-group'>
          <label className='lead' htmlFor='statusOfTheApplication'>
            Status
          </label>
          <select
            {...register("statusOfTheApplication")}
          >
            <option value='0'>* Status</option>
            <option value='Approved'>Approved</option>
            <option value='Rejected'>Rejected</option>
            <option value='CorrectionsForApproval'>
              Corrections for Approval
            </option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='dateOfDecisionGivenToApplicant'>
            Decision of the Planning Committee is given to the Applicant on
          </label>
          <input
            type='date'
            {...register("dateOfDecisionGivenToApplicant")}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage7Comments'>
            Comments
          </label>
          <textarea
            {...register("stage7Comments")}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
        </div>

        {/*stage 7 ends*/}

        <Link className='btn btn-light my-1' to='/admin-dashboard'>
          Go Back
        </Link>
        <input type='submit' className='btn btn-primary my-1' />
      </form>
    </Fragment>
    </section>
  );
};

AdminCreateRecord.propTypes = {
  // Our action createRecord is a function
  createAdminRecord: PropTypes.func.isRequired,
  updateAdminRecord: PropTypes.func.isRequired,
};

export default connect(null, { createAdminRecord, updateAdminRecord })(
  withRouter(AdminCreateRecord)
);
