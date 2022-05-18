import './checkbox.css';

function FilterCheckbox({isCheckboxChecked, handleCheckboxClick}) {
    return (
        <label className="checkbox" >
            <input type="checkbox" onChange={handleCheckboxClick} checked={isCheckboxChecked} className="checkbox__input" />
            <span className="checkbox__slider" />
        </label>
    )
}

export default FilterCheckbox;