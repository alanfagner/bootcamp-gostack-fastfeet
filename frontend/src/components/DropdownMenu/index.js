/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Button } from '~/components/Form';

import {
  Container,
  FaEllipsisHIcon,
  MdDeleteForeverIcon,
  MdModeEditIcon,
  MdRemoveRedEyeIcon,
  Triangle,
  TriangleWhite,
} from './styles';

export default function DropdownMenu({ onDelete, onEdit, onVisualize, onCancel, id }) {
  const buttonRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = useCallback(() => {
    setShowMenu(prev => !prev);
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', openMenu);
    }
    return () => {
      document.removeEventListener('click', openMenu);
    };
  }, [openMenu, showMenu]);

  function deleteItem() {
    if (window.confirm('Deseja deletar o item selecionado ?')) {
      onDelete(id);
    }
  }

  function editItem() {
    onEdit(id);
  }

  function visualizeItem() {
    onVisualize();
  }

  function cancelItem() {
    if (window.confirm('Deseja cancelar o item selecionado ?')) {
      onCancel(id);
    }
  }

  return (
    <Container>
      <Button ref={buttonRef} type="button" className="link" onClick={openMenu}>
        <FaEllipsisHIcon size={20} />
      </Button>

      {showMenu && (
        <div className="option-container">
          <ul>
            {onVisualize && (
              <li onClick={visualizeItem}>
                <MdRemoveRedEyeIcon color="#8E5BE8" />
                <span>Visualizar</span>
              </li>
            )}
            {onEdit && (
              <li onClick={editItem}>
                <MdModeEditIcon color="#8E5BE8" />
                <span>Editar</span>
              </li>
            )}
            {onDelete && (
              <li onClick={deleteItem}>
                <MdDeleteForeverIcon color="#8E5BE8" />
                <span>Excluir</span>
              </li>
            )}
            {onCancel && (
              <li onClick={cancelItem}>
                <MdDeleteForeverIcon color="#8E5BE8" />
                <span>Cancelar encomenda</span>
              </li>
            )}
          </ul>
          <div className="triangule">
            <Triangle />
            <TriangleWhite />
          </div>
        </div>
      )}
    </Container>
  );
}

DropdownMenu.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onVisualize: PropTypes.func,
  onCancel: PropTypes.func,
  id: PropTypes.number.isRequired,
};

DropdownMenu.defaultProps = {
  onDelete: undefined,
  onEdit: undefined,
  onVisualize: undefined,
  onCancel: undefined,
};
