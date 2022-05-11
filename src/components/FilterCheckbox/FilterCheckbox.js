import './checkbox.css';

function FilterCheckbox() {
    return (
        <label className="checkbox">
            <input type="checkbox" className="checkbox__input" />
            <span className="checkbox__slider" />
        </label>
    )
}

export default FilterCheckbox;