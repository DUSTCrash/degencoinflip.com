const ImageToggleButton = ({
  name,
  buttonImageSrc,
  isSelected,
  onSelect
}: any) => {

  return (
    <img onClick={onSelect}
      className={"cursor-pointer double-button toggle-button" + (isSelected ? " selected" : "")}
      src={buttonImageSrc}
      alt={name}
      width="100%"
      height="100%" />
  )
};

export default ImageToggleButton;