import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/helpers';
import FindInterfacesInteractor from '../interactors/findInterfaces';

const INTERFACES_COUNT = 15;

describe('Find interfaces plugin', function () {
  const findInterfaces = new FindInterfacesInteractor();

  setupApplication();

  beforeEach(async function () {
    this.server.createList('interface', INTERFACES_COUNT);

    this.visit('/dummy');
  });

  describe('Find interfaces button', () => {
    it('should be rendered', function () {
      expect(findInterfaces.button.isPresent).to.be.true;
    });

    describe('click action', function () {
      beforeEach(async function () {
        await findInterfaces.button.click();
      });

      it('should open a modal', function () {
        expect(findInterfaces.modal.isPresent).to.be.true;
      });
    });
  });

  describe('modal list', function () {
    beforeEach(async function () {
      await findInterfaces.button.click();
    });

    it('should return a set of results', function () {
      expect(findInterfaces.modal.instances().length).to.be.equal(INTERFACES_COUNT);
    });

    it('should display disabled save button', function () {
      expect(findInterfaces.modal.save.isDisabled).to.be.true;
    });

    describe('select a contact', function () {
      beforeEach(async function () {
        await findInterfaces.modal.instances(1).click();
      });

      it('should enable Save button', function () {
        expect(findInterfaces.modal.save.isDisabled).to.be.false;
      });
    });

    describe('select all', function () {
      beforeEach(async function () {
        await findInterfaces.modal.selectAll.click();
      });

      it('should enable Save button', function () {
        expect(findInterfaces.modal.save.isDisabled).to.be.false;
      });
    });
  });
});
