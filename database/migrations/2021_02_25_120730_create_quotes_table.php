<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->string('zoho_id');
            $table->integer('version')->default(1);
            $table->string('books_id')->nullable();

            $table->string('quote_no');
            $table->string('status')->nullable();
            $table->string('approval_status')->nullable();
            $table->string('sales_person')->nullable();

            $table->string('contact')->nullable();
            $table->string('account')->nullable();

            $table->boolean('include_shipping')->default(1);
            $table->boolean('include_billing')->default(1);

            $table->string('deal_name')->nullable();

            $table->date('valid_from')->nullable();
            $table->date('valid_to')->nullable();

            $table->decimal('vat', 15, 2)->default(0);

            $table->longText('description')->nullable();
            $table->longText('notes')->nullable();

//            $table->decimal('sub_total', 15, 2)->default(0);
//            $table->decimal('total', 15, 2)->default(0);
//            $table->decimal('final', 15, 2)->default(0);

//            $table->string('eventlab_fees_label')->nullable();
//            $table->decimal('eventlab_fees', 15, 2)->default(0);
//
//            $table->string('eventlab_discount_label')->nullable();
//            $table->decimal('eventlab_discount', 15, 2)->default(0);
//
//            $table->string('eventlab_tax_label')->nullable();
//            $table->decimal('tax', 15, 2)->default(0);


//            $table->unsignedBigInteger('term_id')->nullable();
//            $table->foreign('term_id')->references('id')->on('terms')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quotes');
    }
}
