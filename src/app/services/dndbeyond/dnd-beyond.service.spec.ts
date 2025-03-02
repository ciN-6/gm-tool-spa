import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DndBeyondService } from './dnd-beyond.service';
import { environment } from '../../../environments/environment';
import { DndBeyondCharacterRoot } from './models/dnBeyond.models';
import { of } from 'rxjs';

describe('DndBeyondService', () => {
  let service: DndBeyondService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DndBeyondService],
    });
    service = TestBed.inject(DndBeyondService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of null if no characterId is provided', (done) => {
    service.getDndBeyondCharacter('').subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return an observable of null if a null characterId is provided', (done) => {
    service.getDndBeyondCharacter(null as any).subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should make a GET request to the correct URL with a valid characterId', (done) => {
    const characterId = '12345';
    const mockResponse: DndBeyondCharacterRoot = {
      id: 12345,
      success: true,
      message: 'Success',
      data: {
        id: 12345,
        userId: 1,
        username: "Test User",
        isAssignedToPlayer: true,
        readonlyUrl: "test",
        decorations: {
          avatarUrl: "test",
          frameAvatarUrl: "test",
          backdropAvatarUrl: "test",
          smallBackdropAvatarUrl: "test",
          largeBackdropAvatarUrl: "test",
          thumbnailBackdropAvatarUrl: "test",
          defaultBackdrop: {
            backdropAvatarUrl: "test",
            smallBackdropAvatarUrl: "test",
            largeBackdropAvatarUrl: "test",
            thumbnailBackdropAvatarUrl: "test"
          },
          avatarId: 0,
          portraitDecorationKey: null,
          frameAvatarDecorationKey: "test",
          frameAvatarId: 0,
          backdropAvatarDecorationKey: "test",
          backdropAvatarId: 0,
          smallBackdropAvatarDecorationKey: "test",
          smallBackdropAvatarId: 0,
          largeBackdropAvatarDecorationKey: "test",
          largeBackdropAvatarId: 0,
          thumbnailBackdropAvatarDecorationKey: "test",
          thumbnailBackdropAvatarId: 0,
          themeColor: {
            themeColorId: 0,
            themeColor: "test",
            backgroundColor: "test",
            name: "test",
            raceId: null,
            subRaceId: null,
            classId: 0,
            tags: [
              "test"
            ],
            decorationKey: "test"
          }
        },
        name: "test",
        socialName: null,
        gender: null,
        faith: null,
        age: null,
        hair: null,
        eyes: null,
        skin: null,
        height: null,
        weight: null,
        inspiration: true,
        baseHitPoints: 0,
        bonusHitPoints: null,
        overrideHitPoints: null,
        removedHitPoints: 0,
        temporaryHitPoints: 0,
        currentXp: 0,
        alignmentId: null,
        lifestyleId: null,
        stats: [],
        bonusStats: [],
        overrideStats: [],
        background: {
          hasCustomBackground: false,
          definition: {
            id: 0,
            entityTypeId: 0,
            definitionKey: "test",
            name: "test",
            description: "test",
            snippet: "test",
            shortDescription: "test",
            skillProficienciesDescription: "test",
            toolProficienciesDescription: "test",
            languagesDescription: "test",
            equipmentDescription: "test",
            featureName: "test",
            featureDescription: "test",
            avatarUrl: null,
            largeAvatarUrl: null,
            suggestedCharacteristicsDescription: "test",
            suggestedProficiencies: null,
            suggestedLanguages: null,
            organization: null,
            contractsDescription: "test",
            spellsPreDescription: "test",
            spellsPostDescription: "test",
            personalityTraits: [],
            ideals: [],
            bonds: [],
            flaws: [],
            isHomebrew: false,
            sources: [],
            spellListIds: [],
            featList: null,
            grantedFeats: []
          },
          definitionId: null,
          customBackground: {
            id: 0,
            entityTypeId: 0,
            name: null,
            description: null,
            featuresBackground: null,
            characteristicsBackground: null,
            featuresBackgroundDefinitionId: null,
            characteristicsBackgroundDefinitionId: null,
            backgroundType: null
          }
        },
        race: {
          isSubRace: false,
          baseRaceName: "test",
          entityRaceId: 0,
          entityRaceTypeId: 0,
          definitionKey: "test",
          fullName: "test",
          baseRaceId: 0,
          baseRaceTypeId: 0,
          description: "test",
          avatarUrl: "test",
          largeAvatarUrl: "test",
          portraitAvatarUrl: "test",
          moreDetailsUrl: "test",
          isHomebrew: false,
          isLegacy: false,
          groupIds: [],
          type: 0,
          supportsSubrace: null,
          subRaceShortName: null,
          baseName: "test",
          racialTraits: [],
          weightSpeeds: {
            normal: {
              walk: 0,
              fly: 0,
              burrow: 0,
              swim: 0,
              climb: 0
            },
            encumbered: null,
            heavilyEncumbered: null,
            pushDragLift: null,
            override: null
          },
          featIds: [],
          size: null,
          sizeId: 0,
          sources: []
        },
        raceDefinitionId: null,
        raceDefinitionTypeId: null,
        notes: {
          allies: null,
          personalPossessions: null,
          otherHoldings: null,
          organizations: null,
          enemies: null,
          backstory: null,
          otherNotes: null
        },
        traits: {
          personalityTraits: "test",
          ideals: "test",
          bonds: "test",
          flaws: "test",
          appearance: null
        },
        preferences: {
          useHomebrewContent: false,
          progressionType: 0,
          encumbranceType: 0,
          ignoreCoinWeight: false,
          hitPointType: 0,
          showUnarmedStrike: false,
          showScaledSpells: false,
          primarySense: 0,
          primaryMovement: 0,
          privacyType: 0,
          sharingType: 0,
          abilityScoreDisplayType: 0,
          enforceFeatRules: false,
          enforceMulticlassRules: false,
          enableOptionalClassFeatures: false,
          enableOptionalOrigins: false,
          enableDarkMode: false,
          enableContainerCurrency: false
        },
        configuration: {
          startingEquipmentType: null,
          abilityScoreType: 0,
          showHelpText: false
        },
        lifestyle: null,
        inventory: [],
        currencies: {
          cp: 0,
          sp: 0,
          gp: 0,
          ep: 0,
          pp: 0
        },
        classes: [],
        feats: [],
        features: null,
        customDefenseAdjustments: [],
        customSenses: [],
        customSpeeds: [],
        customProficiencies: [],
        customActions: [],
        characterValues: [],
        conditions: [],
        deathSaves: {
          failCount: null,
          successCount: null,
          isStabilized: false
        },
        adjustmentXp: null,
        spellSlots: [],
        pactMagic: [],
        activeSourceCategories: [],
        spells: {
          race: [],
          class: [],
          background: null,
          item: [],
          feat: []
        },
        options: {
          race: [],
          class: [],
          background: null,
          item: null,
          feat: []
        },
        choices: {
          race: [],
          class: [],
          background: [],
          item: [],
          feat: [],
          choiceDefinitions: [],
          definitionKeyNameMap: {}
        },
        actions: {
          race: [],
          class: [],
          background: null,
          item: null,
          feat: []
        },
        modifiers: {
          race: [],
          class: [],
          background: [],
          item: [],
          feat: [],
          condition: []
        },
        classSpells: [],
        customItems: [],
        campaign: {
          id: 0,
          name: "test",
          description: "test",
          link: "test",
          publicNotes: "test",
          dmUserId: 0,
          dmUsername: "test",
          characters: []
        },
        creatures: [],
        optionalOrigins: [],
        optionalClassFeatures: [],
        dateModified: "test",
        providedFrom: "test",
        canEdit: false,
        status: 0,
        statusSlug: null,
        campaignSetting: null
      },
      pagination: null,
    };
    const expectedUrl = `${environment.dndBeyondApi}/character/v5/character/12345`;

    service.getDndBeyondCharacter(characterId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should handle errors from the HTTP request', (done) => {
    const characterId = '12345';
    const expectedUrl = `${environment.dndBeyondApi}/character/v5/character/12345`;
    const mockError = { status: 404, statusText: 'Not Found' };

    service.getDndBeyondCharacter(characterId).subscribe({
      next: (response) => {
        fail('Expected an error, but got a successful response');
      },
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      }
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush('Error', mockError);
  });

});
