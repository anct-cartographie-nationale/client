import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagEnum } from '../../enum/tagEnum.enum';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  @Input() class: string;
  test: string;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getIconOfTag(tag: string): string {
    switch (tag) {
      case TagEnum.aLaUne:
        return 'a-la-une';
      case TagEnum.formation:
        return 'formationTag';
      case TagEnum.projet:
        return 'projetTag';
      case TagEnum.ressource:
        return 'ressourceTag';
      case TagEnum.info:
        return 'infoTag';
      case TagEnum.etude:
        return 'etudeTag';
      case TagEnum.dossier:
        return 'dossierTag';
      default:
        return null;
    }
  }
  public showDetails(post: Post): void {
    this.router.navigateByUrl('posts/details/' + post.id, { state: { data: post } });
  }
}
