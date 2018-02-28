import React from 'react';

const FAB = (props) => (
  <div className="speed-dial--right speed-dial--bottom speed-dial--fixed speed-dial--direction-top">
    <button
      style={{position: "relative"}}
      className={`${props.fab ? "btn--active " :""}btn btn--floating btn--raised red lighten-1`}
      onClick={props.handleClickActionButton}
    >
        <div className="btn__content">
          <i className="material-icons icon">add</i>
          <i className="material-icons icon">close</i>
        </div>
    </button>
    {
      props.fab
      ? <div className="speed-dial__list">
          <span className="my-tooltip tooltip--left" data-tooltip="Add new Budget">
            <span>
              <button className="btn btn--floating btn-raised btn--small light-blue lighten-1">
                <div className="btn__content">
                  <i className="material-icons icon">assignment</i>
                </div>
              </button>
            </span>
          </span>
          <span className="my-tooltip tooltip--left" data-tooltip="Add new Client">
            <span>
              <button className="btn btn--floating btn-raised btn--small green lighten-1">
                <div className="btn__content">
                  <i className="material-icons icon">account_circle</i>
                </div>
              </button>
            </span>
          </span>
        </div>
      : null
    }
  </div>
)

export default FAB;