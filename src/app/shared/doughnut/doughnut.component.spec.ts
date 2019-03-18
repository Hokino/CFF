import {TestBed, async} from '@angular/core/testing';

import {
  Component,
  OnInit,
  Inject,
  forwardRef,
  Renderer,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  HostListener
} from "@angular/core";

import {Router, NavigationEnd} from "@angular/router";
import {Location} from "@angular/common";
import {environment} from "../../../environments/environment";
import {SearchComponent} from '../../search/search.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule,} from '@angular/core';
import {AppComponent} from '../../app.component';
import {DoughnutComponent} from '../../shared/doughnut/doughnut.component';
import {CombinedCffComponent} from '../../cff_store_dashboard/combined-cff/combined-cff.component';
import {CommentComponent} from '../../cff_store_dashboard/comment/comment.component';
import {AppRoutingModule} from '../../app-routing.module';
import {StoreComponent} from '../../cff_store_dashboard//store/store.component';
import {DashboardComponent} from '../../cff_store_dashboard/dashboard/dashboard.component';
import {PickupComponent} from '../../cff_store_dashboard/pickup/pickup.component';
import {GroceryComponent} from '../../cff_store_dashboard/grocery/grocery.component';
import {HttpClientModule} from '@angular/common/http';
import {Service, LoaderService} from '../../shared/Service';
import {StoreCffComponent} from '../../cff_store_dashboard/store-cff/store-cff.component';
import {LinechartComponent} from '../../shared/linechart/linechart.component';
import {BarchartComponent} from '../../shared/barchart/barchart.component';
import {PickupCffComponent} from '../../cff_store_dashboard/pickup-cff/pickup-cff.component';
import {GroceryCffComponent} from '../../cff_store_dashboard/grocery-cff/grocery-cff.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {HorizontalbarComponent} from '../../shared/horizontalbar/horizontalbar.component';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MinibarchartComponent} from '../../shared/minibarchart/minibarchart.component';
import {SearchFilterPipe} from '../../shared/search';
import {SortPipe} from '../../shared/sort';
import {HighLightPipe} from '../../shared/highlight';
import {MarketDashboardComponent} from '../../cff_market_dashboard/market-dashboard/market-dashboard.component';
import {MarketCombinedcffComponent} from '../../cff_market_dashboard/market-combinedcff/market-combinedcff.component';
import {MarketComponent} from '../../cff_market_dashboard/market/market.component';
import {MarketPickupComponent} from '../../cff_market_dashboard/market-pickup/market-pickup.component';
import {MarketGroceryComponent} from '../../cff_market_dashboard/market-grocery/market-grocery.component';
import {RegionDashboardComponent} from '../../cff_region_dashboard/region-dashboard/region-dashboard.component';
import {DivisionDashboardComponent} from '../../cff_division_dashboard/division-dashboard/division-dashboard.component';

import {GbuDashboardComponent} from '../../cff_gbu_dashboard/gbu-dashboard/gbu-dashboard.component';
import {GhtDashboardComponent} from '../../ght_store/ght-dashboard/ght-dashboard.component';
import {RegionPerformanceComponent} from '../../cff_region_dashboard/region-performance/region-performance.component';
import {GhtAuditComponent} from '../../ght_store/ght-audit/ght-audit.component';
import {DivisionPerformanceComponent} from '../../cff_division_dashboard/division-performance/division-performance.component';
import {DivisionCommentComponent} from '../../cff_division_dashboard/division-comment/division-comment.component';
import {GbuPerformanceComponent} from '../../cff_gbu_dashboard/gbu-performance/gbu-performance.component';
import {GbuCommentComponent} from '../../cff_gbu_dashboard/gbu-comment/gbu-comment.component';
import {LogoutComponent} from '../../logout/logout.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {OverviewbarComponent} from '../../shared/overviewbar/overviewbar.component';
import {ScatterplotComponent} from '../../shared/scatterplot/scatterplot.component';
import {RegionCombinedcffComponent} from '../../cff_region_dashboard/region-combinedcff/region-combinedcff.component';
import {RegionGroceryComponent} from '../../cff_region_dashboard/region-grocery/region-grocery.component';
import {RegionPickupComponent} from '../../cff_region_dashboard/region-pickup/region-pickup.component';
import {RegionComponent} from '../../cff_region_dashboard/region/region.component';
import {DivisionCombinedcffComponent} from '../../cff_division_dashboard/division-combinedcff/division-combinedcff.component';
import {GbuCombinedcffComponent} from '../../cff_gbu_dashboard/gbu-combinedcff/gbu-combinedcff.component';
import {DivisionStoreComponent} from '../../cff_division_dashboard/division-store/division-store.component';
import {GbuStoreComponent} from '../../cff_gbu_dashboard/gbu-store/gbu-store.component';
import {GhtMarketDashboardComponent} from '../../ght_market/ght-market-dashboard/ght-market-dashboard.component';
import {GhtRegionDashboardComponent} from '../../ght_region/ght-region-dashboard/ght-region-dashboard.component';
import {GhtDivisionDashboardComponent} from '../../ght_division/ght-division-dashboard/ght-division-dashboard.component';
import {GhtGbuDashboardComponent} from '../../ght_gbu/ght-gbu-dashboard/ght-gbu-dashboard.component';
import {DeepDiveComponent} from '../../ght_store/deep-dive/deep-dive.component';
import {DivisionGroceryComponent} from '../../cff_division_dashboard/division-grocery/division-grocery.component';
import {DivisionPickupComponent} from '../../cff_division_dashboard/division-pickup/division-pickup.component';
import {GbuPickupComponent} from '../../cff_gbu_dashboard/gbu-pickup/gbu-pickup.component';
import {GbuGroceryComponent} from '../../cff_gbu_dashboard/gbu-grocery/gbu-grocery.component';
import {GhtlinechartComponent} from '../../shared/ghtlinechart/ghtlinechart.component';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {AddChallengeDelegationComponent} from '../../challenge_delegation/add-challenge-delegation/add-challenge-delegation.component';
import {QpfdashboardComponent} from '../../qpf_store/qpfdashboard/qpfdashboard.component';
import {SingledoughnutComponent} from '../../shared/qpf_waitttime_doughnut/singledoughnut.component';
import {QpfHorizontalBarComponent} from '../../shared/qpf_horizontal_bars/qpf-horizontal-bar.component';
import {QpfToplineComponent} from '../../qpf_store/qpf-topline/qpf-topline.component';
import {QpfMarketDashboardComponent} from '../../qpf_market/qpf-market-dashboard/qpf-market-dashboard.component';
import {RegionpharmacydashboardComponent} from '../../qpf_region/regionpharmacydashboard.component';
import {DivisionpharmacydashboardComponent} from "../../qpf_division/divisionpharmacydashboard.component";
import {GbupharmacydashboardComponent} from '../../qpf_gbu/gbupharmacydashboard.component';


describe('MarketComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DoughnutComponent,
        CombinedCffComponent,
        CommentComponent,
        StoreComponent,
        DashboardComponent,
        PickupComponent,
        GroceryComponent,
        StoreCffComponent,
        LinechartComponent,
        BarchartComponent,
        PickupCffComponent,
        GroceryCffComponent,
        HorizontalbarComponent,
        HorizontalbarComponent,
        MinibarchartComponent,
        SearchFilterPipe,
        SortPipe,
        HighLightPipe,
        MarketDashboardComponent, MarketCombinedcffComponent, MarketComponent, MarketPickupComponent, MarketGroceryComponent,
        RegionDashboardComponent, DivisionDashboardComponent, GbuDashboardComponent, GhtDashboardComponent, RegionPerformanceComponent,
        GhtAuditComponent, DeepDiveComponent, DivisionPerformanceComponent, DivisionCommentComponent,
        GbuPerformanceComponent, GbuCommentComponent, LogoutComponent, SearchComponent,
        OverviewbarComponent, ScatterplotComponent, RegionCombinedcffComponent,
        RegionGroceryComponent, RegionPickupComponent, RegionComponent, DivisionCombinedcffComponent,
        GbuCombinedcffComponent, DivisionStoreComponent, GbuStoreComponent,
        GhtMarketDashboardComponent, GhtRegionDashboardComponent, GhtDivisionDashboardComponent, GhtGbuDashboardComponent,
        DivisionGroceryComponent, DivisionPickupComponent, GbuPickupComponent, GbuGroceryComponent, GhtlinechartComponent,
        AddChallengeDelegationComponent, QpfdashboardComponent, SingledoughnutComponent, QpfHorizontalBarComponent, QpfToplineComponent,
        QpfMarketDashboardComponent, RegionpharmacydashboardComponent, DivisionpharmacydashboardComponent, GbupharmacydashboardComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxChartsModule,
        Ng2OrderModule,
        FormsModule,
        InfiniteScrollModule
      ],
      providers: [Service, {provide: LocationStrategy, useClass: HashLocationStrategy}, LoaderService]
    })
      .compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(DivisionCombinedcffComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
