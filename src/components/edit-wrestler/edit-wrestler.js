import React from "react"
import PropTypes from "prop-types"

import Brands from "../brands/brands"
import Button from "../button/button"
import Image from "../form/image"
import Input from "../form/input"

const NOOP = () => {}

const EditWrestler = ({
  brandId,
  brands,
  image,
  name,
  id,
  onBrandSelected,
  onImageUpdate,
  onDelete,
  onCreate,
  showDelete,
  onPointsUpdate,
  onNameUpdate,
  points,
}) =>
  <div>
    <h3>
      {name}
    </h3>
    <div className="row bottom-xs">
      <Brands onClick={onBrandSelected} highlighted={brandId} brands={brands} />
    </div>
    <div className="row bottom-xs">
      <div className="col-xs-6 col-lg-8">
        <div className="box">
          <label htmlFor="name">Name</label>
          <Input id="name" onChange={onNameUpdate} value={name} />
        </div>
      </div>
      <div className="col-xs-6 col-lg-4">
        <div className="box">
          <Image id="image" name="image" label={image ? "" : "Drop image here"} value={image} onChange={onImageUpdate} />
        </div>
      </div>
    </div>
    <div className="row bottom-xs">
      <div className="col-xs-6 col-lg-8">
        <div className="box">
          <label htmlFor="points">Points</label>
          <Input id="points" onChange={onPointsUpdate} value={points} />
        </div>
      </div>
      <If condition={showDelete}>
        <div className="col-xs-6 col-lg-4">
          <div className="box">
            <br />
            <Button classes="btn-delete" onClick={onDelete}>
              <i className="icon fa fa-trash" /> Delete wrestler
            </Button>
          </div>
        </div>
      </If>
      <If condition={!id}>
        <div className="col-xs-6 col-lg-4">
          <div className="box">
            <br />
            <Button classes="btn-create" onClick={onCreate}>
              Create wrestler
            </Button>
          </div>
        </div>
      </If>
    </div>
  </div>

EditWrestler.propTypes = {
  brandId: PropTypes.string,
  brands: PropTypes.array,
  id: PropTypes.any,
  image: PropTypes.string,
  name: PropTypes.string,
  onBrandSelected: PropTypes.func,
  onCreate: PropTypes.func,
  onDelete: PropTypes.func,
  onImageUpdate: PropTypes.func,
  onNameUpdate: PropTypes.func,
  onPointsUpdate: PropTypes.func,
  showDelete: PropTypes.bool,
  points: PropTypes.number,
}

EditWrestler.defaultProps = {
  brandId: "",
  brands: [],
  id: false,
  image: "",
  name: "",
  onBrandSelected: NOOP,
  onCreate: NOOP,
  onDelete: NOOP,
  onImageUpdate: NOOP,
  onNameUpdate: NOOP,
  onPointsUpdate: NOOP,
  showDelete: true,
  points: 0,
}
export default EditWrestler
