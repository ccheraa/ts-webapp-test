import { Component, OnInit } from '@angular/core';
import { NavigatorService, LoaderService } from '@ts-webapp/front';
import { DemoModel } from '../../db';
import { Http } from '@angular/http';

let names = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'Ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'Duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'Excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'];
function word(): string {
  return names[Math.floor(Math.random() * names.length)];
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  test: any = [];
  name: string = 'a';
  name2: string = 'Demman CRUISE';
  age: number = 1000;
  age2: number = 100;
  pager = {
    limit: 10,
    pages: 0,
    current: 0,
    count: 0,
    pagesCount: 0,
    goto: function(page: number): boolean {
      if ((page >= 0) && (page < this.pagesCount)) {
        this.current = page;
        return true;
      }
      return false;
    },
    setCount: function(count: number) {
      this.count = count;
      this.pagesCount = Math.ceil(count / this.limit);
      if (this.current > this.pagesCount - 1) {
        this.current = this.pagesCount - 1;
      }
      this.goto(this.current);
    },
    setLimit: function(limit: number) {
      if (limit !== this.limit) {
        this.limit = limit;
        this.setCount(this.count);
        return true;
      }
      return false;
    },
    next: function(): boolean {
      return this.goto(this.current + 1);
    },
    prev: function(): boolean {
      return this.goto(this.current - 1);
    }
  };
  next() {
    if (this.pager.next()) {
      this.refresh();
    }
  }
  prev() {
    if (this.pager.prev()) {
      this.refresh();
    }
  }
  constructor(private nav: NavigatorService, private model: DemoModel, private http: Http, private loader: LoaderService) { }
  ngOnInit() {
    this.nav.title('Test');
    this.nav.home(false);
    this.nav.menu([]);
    console.log(this.model.http);
    // this.test = this.model;
    this.refresh();
    this.model.useLoader(this.loader, 'demo');
    this.model.count().subscribe(count => console.error('count', count));
  }
  refresh () {
    // this.model.get('58987ffb7aa3a102f4a6673f').subscribe(res => this.test = res);
    let config: any = {
      limit: this.pager.limit,
      skip: (this.pager.current < 0 ? 0 : this.pager.current) * this.pager.limit
    };
    this.model.find(null, null, config).subscribe(res => {
      this.test = res.rows;
      console.log(this.test);
      this.pager.setCount(res.total);
    });
  }
  createNew (name, age) {
    this.model.create({ name, age }).subscribe(res => {
      console.info(res);
      this.refresh();
    });
  }
  random(count: number) {
    let docs: any[] = [];
    let i: number;
    for (i = 0; i < count; i++) {
      docs.push({
        name: word(),
        age: Math.ceil(Math.random() * 1000)
      });
    }
    this.model.create(docs).subscribe(res => {
      console.info(res);
      this.refresh();
    });
  }
  setName (id, name) {
    this.model.set(id, { name }).subscribe(res => {
      console.info(res);
      this.refresh();
    });
  }
  setAge (id, age) {
    this.model.set(id, { age }).subscribe(res => {
      console.info(res);
      this.refresh();
    });
  }
  updateByName (name, name2) {
    this.model.update({ name: name2 }, { name }).subscribe(res => {
      console.info(res);
      this.refresh();
    });
  }
  updateByAge (age, age2) {
    this.model.update({ age: age2 }, { age }).subscribe(res => {
      console.info(res);
      this.refresh();
    });
  }
  deleteByName (name) {
    this.model.remove({ name }).subscribe(res => {
      console.info(res);
      this.refresh();
    });
  }
  deleteByAge (age) {
    this.model.remove({ age }).subscribe(res => {
      console.info(res);
      this.refresh();
    });
  }
  clear() {
    this.model.remove({}).subscribe(res => {
      console.info(res);
      this.refresh();
    });
  }
  deleteById(id) {
    this.model.remove(id).subscribe(res => {
      console.info(res);
      // this.refresh();
    });
  }
  edit(doc) {
    this.name = doc.name;
    this.age = doc.age;
  }
}
