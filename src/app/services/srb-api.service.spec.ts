import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SrbApiService } from './srb-api.service';
import { environment } from '../../environments/environment.local';
import { Monster } from './srb-model/models/monster/types';
import { Spell } from './srb-model/models/spell/types';
import { HttpErrorResponse } from '@angular/common/http';

describe('SrbApiService', () => {
  let service: SrbApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SrbApiService],
    });
    service = TestBed.inject(SrbApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMonster', () => {
    it('should make a GET request to the correct URL with a valid monster name', (done) => {
      const monsterName = 'Test Monster';
      const monsterKey = "test-monster"
      const mockResponse: Monster = {
        index: 'test-monster',
        name: 'Test Monster',
      } as Monster;
      const expectedUrl = `${environment.gmToolApi}/api/gm-tool/v1/monsters/${monsterKey}`;

      service.getMonster(monsterName).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });
    it('should handle errors from the HTTP request', (done) => {
      const monsterName = 'Test Monster';
      const monsterKey = "test-monster"
      const expectedUrl = `${environment.gmToolApi}/api/gm-tool/v1/monsters/${monsterKey}`;
      const mockError = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });

      service.getMonster(monsterName).subscribe({
        next: (response) => {
          fail('Expected an error, but got a successful response');
        },
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toEqual('Not Found');
          done();
        }
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush('Error', mockError);
    });
  });

  describe('getSpell', () => {
    it('should make a GET request to the correct URL with a valid spell name', (done) => {
      const spellName = 'Test Spell';
      const spellKey = "test-spell"
      const mockResponse: Spell = {
        index: 'test-spell',
        name: 'Test Spell',

      } as Spell;
      const expectedUrl = `${environment.gmToolApi}/api/gm-tool/v1/spells/${spellKey}`;

      service.getSpell(spellName).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });

    it('should handle errors from the HTTP request', (done) => {
      const spellName = 'Test Spell';
      const spellKey = "test-spell"
      const expectedUrl = `${environment.gmToolApi}/api/gm-tool/v1/spells/${spellKey}`;
      const mockError = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });

      service.getSpell(spellName).subscribe({
        next: (response) => {
          fail('Expected an error, but got a successful response');
        },
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toEqual('Not Found');
          done();
        }
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush('Error', mockError);
    });
  });
  describe('getAllSpells', () => {
    it('should make a GET request to the correct URL', (done) => {
      const mockResponse: Spell[] = [
        {
          index: 'test-spell-1',
          name: 'Test Spell 1',

        } as Spell,
        {
          index: 'test-spell-2',
          name: 'Test Spell 2',

        } as Spell,
      ];
      const expectedUrl = `${environment.gmToolApi}/api/gm-tool/v1/spells`;

      service.getAllSpells().subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });
    it('should handle errors from the HTTP request', (done) => {
      const expectedUrl = `${environment.gmToolApi}/api/gm-tool/v1/spells`;
      const mockError = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' });

      service.getAllSpells().subscribe({
        next: (response) => {
          fail('Expected an error, but got a successful response');
        },
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toEqual('Internal Server Error');
          done();
        }
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush('Error', mockError);
    });
  });
  describe('getSpellsFiltered', () => {
    it('should make a GET request to the correct URL with filter parameters', (done) => {
      const level = '1';
      const school = 'evocation';
      const mockResponse: Spell[] = [
        {
          index: 'test-spell',
          name: 'Test Spell',

        } as Spell,
      ];
      const expectedUrl = `${environment.gmToolApi}/api/gm-tool/v1/spells?level=${level}&school=${school}`;

      service.getSpellsFiltered(level, school).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });
    it('should handle errors from the HTTP request', (done) => {
      const level = '1';
      const school = 'evocation';
      const expectedUrl = `${environment.gmToolApi}/api/gm-tool/v1/spells?level=${level}&school=${school}`;
      const mockError = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });

      service.getSpellsFiltered(level, school).subscribe({
        next: (response) => {
          fail('Expected an error, but got a successful response');
        },
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toEqual('Bad Request');
          done();
        }
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush('Error', mockError);
    });
  });
});
