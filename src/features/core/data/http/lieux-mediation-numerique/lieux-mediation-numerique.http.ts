import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromSchemaLieuDeMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { DataConfiguration } from '../../../../../root';
import { LieuxMediationNumeriqueRepository } from '../../../repositories';
import { Aidants, LieuMediationNumeriqueWithAidants } from '../../../models';
import { AidantTransfer, LieuMediationNumeriqueWithAidantsTransfer } from '../../../transfer';

const aidantsIfAny = (aidants?: AidantTransfer[]): { aidants?: Aidants } =>
  aidants == null ? {} : { aidants: Aidants(aidants) };

const toLieuMediationNumeriqueWithAidants = (
  lieuMediationNumeriqueWithAidantsTransfer: LieuMediationNumeriqueWithAidantsTransfer
): LieuMediationNumeriqueWithAidants => ({
  ...fromSchemaLieuDeMediationNumerique(lieuMediationNumeriqueWithAidantsTransfer),
  ...aidantsIfAny(lieuMediationNumeriqueWithAidantsTransfer.aidants)
});

const toLieuxMediationNumeriqueWithAidants = (
  lieuxMediationNumeriqueWithAidantsTransfer: LieuMediationNumeriqueWithAidantsTransfer[]
): LieuMediationNumeriqueWithAidants[] => lieuxMediationNumeriqueWithAidantsTransfer.map(toLieuMediationNumeriqueWithAidants);

export class LieuxMediationNumeriqueHttp extends LieuxMediationNumeriqueRepository {
  public constructor(private readonly dataConfiguration: DataConfiguration, private readonly httpClient: HttpClient) {
    super();
  }

  public getAll$(): Observable<LieuMediationNumeriqueWithAidants[]> {
    return this.httpClient
      .get<LieuMediationNumeriqueWithAidantsTransfer[]>(this.dataConfiguration.lieuxDeMediationNumerique)
      .pipe(map(toLieuxMediationNumeriqueWithAidants));
  }

  public getLieuxByPostalCodes$(postalCodes: string[]): Observable<LieuMediationNumeriqueWithAidants[]> {
    return this.getAll$().pipe(map((lieux) => lieux.filter((lieu) => postalCodes.includes(lieu.adresse.code_insee ?? ''))));
  }
}
